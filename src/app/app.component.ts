import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { SupportService } from 'src/services/support.service';
 import { NgxSpinnerService } from 'ngx-spinner';
import { MatMenuTrigger } from '@angular/material/menu';
  
 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnChanges,OnInit{
  
  @ViewChild(MatMenuTrigger) matMenuTrigger: MatMenuTrigger;
  @ViewChild('trigger') trigger: MatMenuTrigger;
  @ViewChild('profile') profile: MatMenuTrigger;
 
   
  title = 'coaching-pwa';
  user:any 
  public compLoad:string = "login"
  element:HTMLElement = document.getElementById('body') as HTMLElement

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    ); 
    menuItems = ['admin', 'login', 'tests'];
  
    constructor(private spinner:NgxSpinnerService , private service:SupportService, private breakpointObserver: BreakpointObserver , private router:Router) {
     this.service.currentUser.subscribe((data)=>{
       this.user = data
       
       console.log(data) 
     })
  
  }

  ngOnInit(): void {
    console.log(this.user)
     
    this.service.currentUser.subscribe((data)=>{
      this.user = data
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
     console.log(this.service.userToken)
  }
  
  changeCard(msg:string){
    this.compLoad=msg;
    console.log(this.compLoad)
  }

  logout(){
    this.service.logout()
    this.spinner.show()
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.router.navigate(['/'])
    }, 3000);
     
}

openMyMenu(name:string) {
 if(name ==='trigger'){
   this.trigger.openMenu()
  
 }
 else if(name === "about"){
   this.matMenuTrigger.openMenu()
    
 }else{
   this.profile.openMenu()
 }
} 
closeMyMenu(name:string) {
  if(name==='trigger'){
    this.trigger.closeMenu()
  } else if(name === "about"){
    this.matMenuTrigger.closeMenu()
  }else{
    this.profile.openMenu()
  }
}
}
