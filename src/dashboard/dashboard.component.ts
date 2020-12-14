import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SupportService } from 'src/services/support.service';
import { parseJwt } from '../functions'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
allCourses:any=[];
error = ""   
user:any   
completion=0
enrolledCourses:any=[];
constructor(private spinner:NgxSpinnerService, private router:Router , private breakpointObserver: BreakpointObserver , private service:SupportService) {}
  loading=false  
  
  ngOnInit(): void {
      this.service.currentUser.subscribe((data)=>{
        this.user = data
      })
       const auth = {
        "token":this.user.token
       }
       //get All Quizzes
       this.service.getDashboardCourses(auth).subscribe(data=>{
          this.allCourses = data
          console.log(this.allCourses)
        })
       this.service.getEnrolledCourses(auth).subscribe(data =>{
          
         this.enrolledCourses = data
         console.log(this.enrolledCourses)
       }) 

  }


enrollUser(course:any){
  let { courseName , dateEnrolled , validUntill , testList , courseFees , paid} =  course 
   for(let enrolled in this.enrolledCourses){
     if(this.enrolledCourses[enrolled].courseName === courseName){
       return
     }

   }
   if(courseFees === "Free"){
    course.token = localStorage.getItem("userToken") 
    course.dateEnrolled = Date.now()
    course.paid = true
    this.loading = true
   setTimeout(()=>{
    this.service.enrollUser(course).subscribe((data)=>{
     console.log(data)
     this.loading=false;
     
    })
   },2000)
   }
   
   
}

   navigateTestDashboard(course:any){
  
  
    this.spinner.show() 
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    this.spinner.hide();
    this.router.navigate(['/quizDash' ],{queryParams: {"msg":course.courseName,"tests":course.testList.join()}})

  }, 5000); 
   
}

}
