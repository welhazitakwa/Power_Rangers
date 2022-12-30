import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

  constructor(private authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('the value of token ' + localStorage.getItem("Token"))
    if (localStorage.getItem("Token")) {
      req = req.clone(
        {
          setHeaders: {
            Authorization:`Bearer ${localStorage.getItem("Token")}`
          }
        }
      )
    }
    return next.handle(req);
  }

}
