import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../common/employee';
import {Roles} from '../common/Roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`http://localhost:8083/auth/employee/all`);
  }




  public getRoles() : Observable<Roles[]> {
    return this.http.get<Roles[]>(`http://localhost:8083/auth/roles`)
  }

  public addEmployee(employee: FormData): Observable<Employee> {
    return this.http.post<Employee>(`http://localhost:8083/auth/employee/add`, employee);
  }

  public updateEmployee(employee: FormData): Observable<Employee> {
    return this.http.put<Employee>(`http://localhost:8083/auth/employee/`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8083/auth/employee/delete/${employeeId}`);
  }
  public get(employeeId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8083/auth/employee/find/${employeeId}`);
  }

  public getUser():Observable<any> {
    return this.http.get<any>(`http://localhost:8083/auth/user`)
  }

  updateProfile(formData: FormData) : Observable<any> {
    console.log(JSON.stringify(formData))
    return this.http.put<any>("http://localhost:8083/auth/employee", formData)
  }

  getMuniciaplites() : Observable<any> {
    return this.http.get<any>("http://localhost:8083/municipalites")
  }

  getUserByRole(role: String) : Observable<any> {
    return this.http.get<any>("http://localhost:8083/auth/employee/roles/"+role)
  }

  getUsersByRoleAndMuni(role: String) {
    return this.http.get<any>("http://localhost:8083/auth/employees/roles/"+role);
  }
}
