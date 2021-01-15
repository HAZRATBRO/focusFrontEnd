 
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
 
@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.css']
})
export class IntroPageComponent implements OnInit {

  agreed=false
  testName:string;
   
  
  constructor(
    private route:ActivatedRoute ,private router:Router) {
   
  }

 
 
  ngOnInit() {
      this.route.queryParams.subscribe(params => {
           
          this.testName = params.msg  
          // console.log(params)
      }); 
       
  }
  
 
  
  routeTest(msg:string , testName:string){
    // console.log(msg , testName)
    this.router.navigate(['/'+msg ],{queryParams: {"msg": testName}})
  
     
 }
  
}
