import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {UserLogin} from "../common/user-login";
import {Observable} from "rxjs";
import {Employee} from "../common/employee";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  headers!: string[]
  token: String = ""
  constructor(private httpClient: HttpClient) {
  }

  login(data: UserLogin):Observable<HttpResponse<any>> {
    this.logout();
    return this.httpClient.post<any>("http://localhost:8083/auth/login", data, {observe: 'response'})
  }

  isLogin() {
    console.log('a7na fi isLogin', localStorage.getItem("Token"))
    return localStorage.getItem("Token") != null
  }

  logout() {
    localStorage.clear();
  }

  public getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`http://localhost:8083/auth/employee/all`);
  }

  getEmployee():Observable<Employee> {
    return this.httpClient.get<Employee>('http://localhost:8083/auth/user')
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`http://localhost:8083/auth/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`http://localhost:8083/auth/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8083/auth/employee/delete/${employeeId}`);
  }
}
