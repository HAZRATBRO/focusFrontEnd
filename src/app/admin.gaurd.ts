import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AdminService } from 'src/services/admin.service';
import { SupportService } from 'src/services/support.service';
import {verifyToken} from '../functions' 
import {parseJwt} from '../functions'
@Injectable({providedIn:'root'})
export class AdminGuard implements CanActivate {
    currentUser:any
        constructor(private spinner:NgxSpinnerService, private service:AdminService, protected router: Router) {
            this.service.currentUser.subscribe((data)=>{
                this.currentUser = data
            })
        
         }
   
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :  Promise<boolean>|boolean {
         
        let t = new Promise<boolean>((resolve , reject)=>{
            setTimeout(()=>{ this.spinner.hide();  resolve(true)} , 2000)
        })  
        let f = new Promise<boolean>((resolve , reject)=>{
            setTimeout(()=>{ this.spinner.hide(); resolve(false)} , 2000)
        }) 
        //  console.log("Admin Check ")
             
             
            
                if(this.currentUser !== null && this.currentUser!== undefined ){
                    if(verifyToken(this.currentUser.token))
                        { 
                            this.spinner.show()
                            // console.log("Triggered")
                             
                            return t
                        }  
                }
             
            
         
            else{  
                this.spinner.show()  
                setTimeout(()=>{ 
                    this.spinner.hide() ;
                    console.log('Routing to login')   
                    //not logged in so redirect to login page
                    this.router.navigate(['/adminLogin'])
                    return false;
                } , 2000)
            
             
        }
          
          
     return f
}

}