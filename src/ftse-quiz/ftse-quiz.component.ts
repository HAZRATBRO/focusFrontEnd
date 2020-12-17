import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupportService } from 'src/services/support.service';

@Component({
  selector: 'app-ftse-quiz',
  templateUrl: './ftse-quiz.component.html',
  styleUrls: ['./ftse-quiz.component.css' ]
})
export class FtseQuizComponent implements OnInit {

  savedQuiz:boolean;
  isComplete:boolean;
  constructor(private service:SupportService , private router:Router) { }

  ngOnInit(): void {
    this.savedQuiz = localStorage.getItem("Focus Chemistry DPP")!=null
    console.log((this.savedQuiz!== true) && (this.isComplete!==true))
    console.log(this.savedQuiz)
    this.service.getCompletionStatus("Focus Chemistry DPP").subscribe((data)=>{
      this.isComplete = data.isComplete
    })
    console.log(this.isComplete)
  }
  routeTest(msg:string , testName:string){
    console.log(msg , testName)
    this.router.navigate(['/'+msg ],{queryParams: {"msg": testName}})
  
     
 }
}