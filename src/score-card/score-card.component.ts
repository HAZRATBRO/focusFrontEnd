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

const ELEMENT_DATA:results[] =   [
  {position: 1, Section: 'Mathematics', Correct : 13, Wrong: 3 , Skipped:2,Correct_Marks:36 , Wrong_mark:-4 ,Total:'32/60'},
  {position: 2, Section: 'Physics', Correct : 14, Wrong: 2 , Skipped:2,Correct_Marks:40 , Wrong_mark:-3 ,Total:'37/60'},
  {position: 3, Section: 'Chemistry', Correct : 10, Wrong: 2 , Skipped:6,Correct_Marks:30 , Wrong_mark:-4 ,Total:'26/60'},
  
];

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {
   
  @ViewChild(BaseChartDirective) chart: any;
  
  displayedColumns: string[] = ['Section', 'Correct', 'Wrong', 'Skipped','Correct_Marks','Wrong_mark','Total'];
  dataSource = ELEMENT_DATA
  labels:any = []
  tab:any = 'overall'
  barData:any[] = []
  user:any
  testName:any
  quizResult:any
  highestScore:any
  lowestScore:any
  totalStudents:any
  myTotalScore:any = 0
  totalAttempted:any = 0
  accuracy:any = 0
  percentageScore:any = 0
  constructor(private service:SupportService , private route:ActivatedRoute ,private router:Router) { 
     
  }
  public ngAfterViewInit(): void
  {
      }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
           
    this.testName = params.testName  
    console.log(params)
}); 

this.service.currentUser.subscribe((data)=>{
  this.user = data
  console.log(data)
})


  this.service.getUserResponse({"testName":"FinalTest"} ).subscribe((data)=>{
      this.quizResult = data
      console.log(data)
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
    this.quizResult.sections.forEach((section: any) => {
      section.sectionMarks = 0
      section.questions.forEach((question: any) => {
          this.myTotalScore+=question.marksAwarded
          if(question.response.input != '' || question.response.checkBox.length > 0){
              this.totalAttempted+=4
          }
          section.sectionMarks += question.marksAwarded
      });
      section.sectionMarks=(section.sectionMarks/8)*100
      
   });
   this.accuracy = (this.myTotalScore/this.totalAttempted)*100
   this.percentageScore = (this.myTotalScore/this.quizResult.totalMarks)*100
   this.setData('overall')
   console.log(this.quizResult)
   console.log(this.accuracy)
   console.log(this.percentageScore)
  }

  setData(type:string){
    this.tab = type
    if(type === 'overall'){
      this.labels = []
      this.labels.push(this.quizResult.testName)
      this.barData = []
      this.barData.push({data:[this.percentageScore] , label:'My Score%'})
      this.barData.push({data:[11] , label:'Class Score%'})
      console.log(this.barData) 
       
    }
    else if(type === 'strengthWeaks'){
        //pass strength and weakness data to barChart
    }
    // else{
    //   //pass subjectwise data
    //   this.barData = [] 
    //   this.barData[0] = {data:[] , label:'My Score'}
    //   this.barData[1] = {data:[], label:'Class Score'}
    //   this.labels = [] 
         
    //   this.quizResult.sections.forEach((element: any) => {
        
    //     this.labels.push(element.name)
    //    this.barData[0].data.push(element.sectionMarks)
    //     this.barData[1].data.push(12)
          
    //   });
    //   console.log(this.barData)
    //   // this.chart.chart.data.datasets[0].data = x
    //   // this.chart.chart.data.datasets[1].data = s
    //   // this.chart.chart.update()
       
    // }
   
  }

}
