import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {Employee} from '../../common/employee';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: any[]
  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    this.getEmployees()
  }

  public getEmployees(): void {
    if (localStorage.getItem("Roles") == "[ADMIN]") {
      console.log("we are ready to get users mayor ");
    this.UserService.getUserByRole("MAIRE").subscribe(
      (response: Employee[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  } else {
      this.UserService.getUsersByRoleAndMuni("TECHNICIEN").subscribe(
        (response: Employee[]) => {
          this.users = response;
          console.log(this.users);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.UserService.getUsersByRoleAndMuni("VETERINAIRE").subscribe(
        (response: Employee[]) => {
          this.users.push(...response);
          console.log("all the users are " + JSON.stringify(this.users));
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }


  public onDeleteEmployee(employeeId: number): void {
    this.UserService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
