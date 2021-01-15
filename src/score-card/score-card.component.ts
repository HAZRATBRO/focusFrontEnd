import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { SupportService } from 'src/services/support.service';

export interface results{
  Section:string;
  Correct:number;
  Wrong:number;
  Skipped:number;
  Correct_Marks:number;
  Wrong_mark:number;
  Total:string;
  position:number
}

 

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ overflow:'hidden', height:0,opacity: 0 }),
            animate(500, 
                    style({  opacity: 1 ,height:'*'}))
          ]
        ),
        transition(
          ':leave', 
          [
            style({  overflow:'hidden', height:'*',opacity: 1 }),
            animate(500, 
                    style({ opacity: 0 ,height:0}))
          ]
        )
      ]
    )
  ]
})
export class ScoreCardComponent implements OnInit {
   
  // @ViewChild(BaseChartDirective) chart: any;
  
  // displayedColumns: string[] = ['Section', 'Correct', 'Wrong', 'Skipped','Correct_Marks','Wrong_mark','Total'];
   
  // labels:any = []
  // tab:any = 'overall'
//   barData:any ={overall: {data:[
//     {data:[54] , label:'Your Performance %'},
//     {data:[14] , label:'Class Performance %'}
//   ] , labels:['Quiz']}, subjectWise:{data:[{data:[54,32,11] , label:'Your Performance %'},
//   {data:[14,11,34] , label:'Class Performance %'}
// ], labels:['Section1','Section2','Section3']}}
  
  user:any
  testName:any 
  quizResult:any
  myTotalScore:any = 0
  totalAttempted:any = 0
   
  chartSelected: string = "overall";
  constructor(private service:SupportService , private route:ActivatedRoute ,private router:Router) { 
     
  }
  public ngAfterViewInit(): void
  {
      }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
           
    this.testName = params.msg  
     
}); 

this.service.currentUser.subscribe((data)=>{
  this.user = data
   
})


  this.service.getUserResponse({"testName":this.testName}).subscribe((data)=>{
      this.quizResult = data[0]
      console.log(data[0])
      this.calculateStats()
  })
   

  }


   


  getCurrentUser():Observable<any>{
    const user = this.service.currentUser.pipe(shareReplay())
    user.subscribe((res)=>this.user = res , (err)=>{console.log(err)})
    return user
  }
  getUserData(data:any , token:any)   {
    // this.service.getUserResponse(data , token).filter(result => result)
    // .do(() => sessionStorage.setItem("UserID", this.StaffCode))
    // .mergeMap(() => this.GetUserName())
    // .subscribe( // This does not execute until the observable from GetUserName is complete
    //    result => this.router.navigate(['/log-tracker']),
    //    error => console.log(error)
    // );
  }
   
  calculateStats(){
    this.quizResult.timeTaken = 0
    this.quizResult.myTotalScore = 0
    this.quizResult.positiveMarks = 0
    this.quizResult.negativeMarks = 0
    this.quizResult.unattemptedCount = 0
    this.quizResult.wrongAttempt = 0
    this.quizResult.correctAttempt = 0
    this.quizResult.attemptedCount = 0
    this.quizResult.sections.forEach((section: any) => {
      section.marksScored = 0
      section.wrongAttempt=0
      section.correctAttempt=0
      section.unattemptedCount=0
      section.attemptedCount = 0
      section.questions.forEach((question: any) => {
        if(question.marksAwarded < 0 ){
          this.quizResult.negativeMarks += question.marksAwarded
          this.quizResult.wrongAttempt += 1
          section.wrongAttempt +=1
          
         }
        else if(question.marksAwarded > 0){
          this.quizResult.correctAttempt+=1
          section.correctAttempt+=1
          this.quizResult.positiveMarks += question.marksAwarded
           
         }
          else if(question.marksAwarded === 0){
            if(question.type !== 'SingleChoice' || question.type !== 'MultipleChoice') {
            if (question.response.input ==='' && question.response.checkBox.length === 0){
              //unattempted
              section.unattemptedCount+=1
              this.quizResult.unattemptedCount +=1
            }
            else{
              //wrongAnswer
               
              this.quizResult.wrongAttempt += 1
              section.wrongAttempt +=1
            }
          }
          else{
            section.unattemptedCount+=1
            this.quizResult.unattemptedCount +=1
          }
        } 
          this.quizResult.myTotalScore+=question.marksAwarded
          section.marksScored += question.marksAwarded
          section.attemptedCount+=1
      });

          section.timeSpent = Math.floor(section.timeSpent/60)
          this.quizResult.timeTaken += section.timeSpent
          section.attemptedCount = (section.correctAttempt + section.wrongAttempt)
          section.accuracy=(section.attemptedCount === 0)? 0:((section.correctAttempt/section.attemptedCount)*100)
          section.percentageScore =  ((section.marksScored/section.sectionMarks)*100)
          console.log(section.sectionName + " accuracy " + section.accuracy + " percentage " + section.percentageScore)
          });
      console.log(this.quizResult.myTotalScore)
      this.quizResult.attemptedCount = this.quizResult.wrongAttempt + this.quizResult.correctAttempt
      this.quizResult.accuracy =(this.quizResult.attemptedCount===0)? 0 : (this.quizResult.correctAttempt/this.quizResult.attemptedCount)*100
      this.quizResult.percentageScore =  ((this.quizResult.myTotalScore/this.quizResult.totalMarks)*100)
      //  this.setData('overall')
    
  }

   
  changeChart(msg:string){
      this.chartSelected = msg
       
  } 

}
