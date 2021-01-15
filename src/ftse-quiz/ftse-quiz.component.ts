import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportService } from 'src/services/support.service';

@Component({
  selector: 'app-ftse-quiz',
  templateUrl: './ftse-quiz.component.html',
  styleUrls: ['./ftse-quiz.component.css' ]
})
export class FtseQuizComponent implements OnInit {
  
  currentDate:Date;
  dashBoardData:any;
  // validity:any;
  // quizDuration:any;
  // quizName:string;
  // quizMarks:any;
  savedQuizzes:boolean[] = [];
  isComplete:boolean;
  constructor(private service:SupportService, private route:ActivatedRoute , private router:Router) { }

  ngOnInit(): void {

    // this.route.queryParams.subscribe((params) => {
        
    //   this.quizName = params.testName
    //   this.quizDuration = params.testDuration
    //   this.validity = params.validity
    //   this.quizMarks = params.testMarks
    //   });

     
    // console.log((this.savedQuiz!== true) && (this.isComplete!==true))
    this.currentDate = new Date();
    
    this.service.getDashboardData().subscribe((data)=>{
      this.dashBoardData = data
      console.log(data)
      this.dashBoardData.forEach((data:any) => {
        data.validBefore = new Date(data.validBefore)
        data.schemeList = Object.keys(data.markingScheme)
        console.log(data.schemeList)
        let idx =data.schemeList.indexOf("notAttempted")
        data.schemeList.splice(idx , 1)
        this.savedQuizzes.push(localStorage.getItem(data.testName)!=null)
      });
    
    })  

     
  
  }
  routeTest(msg:string , testName:string){
    console.log(msg , testName)
    this.router.navigate(['/'+msg ],{queryParams: {"msg": testName}})   
 }
}