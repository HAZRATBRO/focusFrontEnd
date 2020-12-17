import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SupportService } from 'src/services/support.service';
import { Router } from '@angular/router';

 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: SupportService, private router:Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                // location.reload(true);
                this.router.navigate(['/'])
            }
            else{
                alert("Error : We are working on the issue , please navigate to home")
                this.router.navigate(['/'])
            }

             
            return throwError(err);
        }))
    }
}