import { DOCUMENT } from '@angular/common';
import { HostListener } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarService } from 'src/services/toolbar.service';
 
@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.css']
})
export class IntroPageComponent implements OnInit {

  agreed=false
  testName:string;
  cheatingCount:any = 0 
  @HostListener('window:visibilitychange' , ['$event'])
  cheating(event:any){
    !document.hidden?(this.cheatingCount+=1):'Hey'
    console.log(this.cheatingCount)
  }
  @HostListener('window:beforeunload' , ['$event'])
  beforeUnload(event:any){
     localStorage.setItem("cheatingCount",this.cheatingCount)
     console.log(this.cheatingCount)
  }
  
  constructor(
    private route:ActivatedRoute ,private router:Router,@Inject(DOCUMENT) private document: any) {
    document.addEventListener("visibilitychange", function() {
      document.title = document.hidden ? "I'm away" : "I'm here";
      
  });
   window.addEventListener('keyup',disableF5)
   window.addEventListener('keydown' , disableF5)
  function disableF5(e:any){
    if ((e.which || e.keyCode)==116 ) e.preventDefault()
  }
  }

 
 
  ngOnInit() {
    this.cheatingCount = localStorage.getItem("cheatingCount") == null ? 0:parseInt(localStorage.getItem("cheatingCount")||'0')  
     this.route.queryParams.subscribe(params => {
           
          this.testName = params.msg  
          console.log(params)
      }); 
       
  }
  
 
  
  routeTest(msg:string , testName:string){
    console.log(msg , testName)
    this.router.navigate(['/'+msg ],{queryParams: {"msg": testName}})
  
     
 }
  
}
