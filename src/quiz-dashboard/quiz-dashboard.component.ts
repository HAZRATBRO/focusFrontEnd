import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SupportService } from 'src/services/support.service';
import { verifyToken } from '../functions'
import {parseJwt} from '../functions'
@Component({
  selector: 'app-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.css']
})
export class QuizDashboardComponent implements OnInit {
  loading = false
  savedQuizzes:any = [];
  user:any 
  userResponses:any={}
  allQuizzes:any={}
  error = "" 
  testList:any
  constructor(private spinner:NgxSpinnerService , private service:SupportService , private route:ActivatedRoute ,private router:Router) { }
  
   ngOnInit()  {
    this.route.queryParams.subscribe(params => {
           
      this.testList = params.tests.split(',')
    console.log(params)
    
});  


      this.service.currentUser.subscribe((data)=>{
        this.user = data

      })
      // console.log(this.route.snapshot.queryParamMap.keys)
      // this.userResponses = this.route.snapshot.queryParamMap.get("userResponses")
      // this.allQuizzes = this.route.snapshot.queryParamMap.get("allQuizzes")?.toString()
      
       
     
     this.service.getAllCourseQuizzes(this.testList , this.user.token).subscribe((data)=>{
      this.allQuizzes = data
      this.service.getAllUserResponses(this.user.token).subscribe((data)=>{
        this.userResponses = data 
        console.log(data)
      }) 
    }) 

    
     
    let y = JSON.parse(localStorage.getItem('savedQuizzes')||'[]')
    if(y.length > 0){
      y.forEach((element: any) => {
        this.savedQuizzes.push(JSON.parse(localStorage.getItem(element)||'{}'))
      });
    }
}

 
 
routeTest(msg:string , testName:string){
   
  this.spinner.show() 
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
    this.router.navigate(['/'+msg ],{queryParams: {"msg": testName}})

  }, 5000); 
   
    
  
}

}
