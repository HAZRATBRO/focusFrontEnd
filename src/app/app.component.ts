import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  Router
} from '@angular/router';
import {Idle , DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core'
import {Keepalive} from '@ng-idle/keepalive'

import { SupportService } from 'src/services/support.service';
 import { NgxSpinnerService } from 'ngx-spinner';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolbarService } from 'src/services/toolbar.service';
   
 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnChanges,OnInit{
  
  @ViewChild(MatMenuTrigger) matMenuTrigger: MatMenuTrigger;
  @ViewChild('trigger') trigger: MatMenuTrigger;
  @ViewChild('profile') profile: MatMenuTrigger;
   

   
idleState = 'Not started.';
timedOut = false;
lastPing?: Date = undefined;
 

  title = 'coaching-pwa';
  user:any 
  public compLoad:string = "login"
 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    ); 
    menuItems = ['admin', 'login', 'tests'];
  
    

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
     
      this.router.navigate(['/'])
    
     
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

//code for autologout user when the user is inactive for more than 10 minutes

 
constructor(public toolbarService:ToolbarService ,public dialog:MatDialog ,private spinner:NgxSpinnerService , private service:SupportService, private breakpointObserver: BreakpointObserver , private idle: Idle, private keepalive: Keepalive, 
  private router: Router) {
  

    this.service.currentUser.subscribe((data: any)=>{
      this.user = data
    }) 
  
    // sets an idle timeout of 5 seconds, for testing purposes.
  idle.setIdle(3600);
  
  
  // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
  idle.setTimeout(10);
  
  
  // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
  idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

  idle.onIdleEnd.subscribe(() => { 
    this.idleState = 'No longer idle.'
    console.log(this.idleState);
    this.reset();
  });
  
  idle.onTimeout.subscribe(() => {
    this.dialog.closeAll()
    this.idleState = 'Timed out!';
    this.timedOut = true;
    this.dialog.closeAll()
    console.log(this.idleState);
     this.logout()
  });
  
  idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
      console.log(this.idleState);
      this.dialog.open(InactivityDialogComponent);
  });
  
  idle.onTimeoutWarning.subscribe((countdown: number) => {
    this.idleState = 'You will be logged out in ' + countdown + ' seconds!'
    console.log(this.idleState);
  });

  // sets the ping interval to 15 seconds
  keepalive.interval(15);

  keepalive.onPing.subscribe(() => this.lastPing = new Date());

  this.service.currentUser.subscribe((user: any) => {
    console.log(user)
    if (user) {
      idle.watch()
      this.timedOut = false;
    } else {
      idle.stop();
    }
  })

  // this.reset();
}

reset() {
  this.idle.watch();
  this.idleState = 'Started.';
  this.timedOut = false;
}
 
stay() {
  console.log("Triggered")
  this.dialog.closeAll();
  this.reset();
}

openDialog() {
  console.log(this.idleState)
  const dialogRef = this.dialog.open(InactivityDialogComponent  );


  dialogRef.afterClosed().subscribe((result)=>{
    console.log(result)
    if(result === "stay"){
      this.stay()
    }
  })
}


}

 
@Component({
  selector: 'app-inactivity-dialog',
  templateUrl: './inactivity-dialog/inactivity-dialog.component.html',
  styleUrls: ['./inactivity-dialog/inactivity-dialog.component.css']
})
export class InactivityDialogComponent implements OnInit {
  

  constructor(public dialogRef: MatDialogRef<InactivityDialogComponent> ,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
close(msg:string){
  console.log(msg)
  this.dialogRef.close(msg)
}
}
