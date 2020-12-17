import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SupportService } from 'src/services/support.service';
import {verifyToken} from '../functions' 
import {parseJwt} from '../functions'
@Injectable({providedIn:'root'})
export class LoginGuard implements CanActivate {
    currentUser:any
        constructor(private spinner:NgxSpinnerService, private service:SupportService, protected router: Router) {
            this.service.currentUser.subscribe((data)=>{
                this.currentUser = data
            })
         }
    // dummyFunction(){
    //     this.router.events.subscribe((event: Event) => {
    //         switch (true) {
    //           case event instanceof NavigationStart: {
    //             this.spinner.show()
    //             break;
    //           }
      
    //           case event instanceof NavigationEnd:{
    //            let e:any = event
    //            setTimeout(() => {
    //             /** spinner ends after 5 seconds */
    //             this.spinner.hide();
                
    //           }, 3000);
    //            if(e.url === '/' ){
                  
    //              if(this.user !==null ){
                   
    //               this.router.navigate(['/'])
                  
    //              }
      
      
                  
    //              }
    //            else{
      
                
    //            }
    //            this.spinner.show()
    //            setTimeout(() => {
    //              /** spinner ends after 5 seconds */
    //              this.spinner.hide();
                  
    //            }, 1000);
              
    //             break
    //           }
    //           case event instanceof NavigationCancel:
    //           case event instanceof NavigationError: {
                 
                 
    //             break;
    //           }
    //           default: {
    //             break;
    //           }
    //         }
    //       });
    // }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :  Promise<boolean>{
        let t = new Promise<boolean>((resolve , reject)=>{
            setTimeout(()=>{ this.spinner.hide() ; resolve(true)} , 2000)
        })  
        let f = new Promise<boolean>((resolve , reject)=>{
            setTimeout(()=>{ this.spinner.hide() ;resolve(false)} , 2000)
        }) 
        
        let passWithoutVerify = ['','faculty','admissions','contact','login','about']
        if(passWithoutVerify.includes(route.url.toString()))
        {
             
            this.spinner.show()
            if(route.url.toString() === 'login'){
                if(this.currentUser !== null && this.currentUser!== undefined ){
                    if(verifyToken(this.currentUser.token))
                        {setTimeout(()=>{
                            this.spinner.hide()
                            this.router.navigate(['/ftseQuiz'])
                        } , 3000)}
                }
            }
             return t;
        }
        this.spinner.show()
         
            try {
                if(this.currentUser !== null && this.currentUser!== undefined ){
                        console.log("Stop epin")
                         
                    if(verifyToken(this.currentUser.token))
                        return t
                     else
                        return f  
                    
                    } 
            } catch (error) {
                
                    console.log('Routing to login' + error)   
                    //not logged in so redirect to login page
                    this.router.navigate(['/'])
                    return f;
                 
            }
            this.spinner.hide()
            console.log('Routing to login')   
            //not logged in so redirect to login page
            this.router.navigate(['/'])
            return f;
        
          
          
     
}

}