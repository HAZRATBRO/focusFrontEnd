import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { timer , Subscription } from 'rxjs';
import { SupportService } from 'src/services/support.service';
import { verifyToken } from '../functions'
import {parseJwt} from '../functions'

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
  ,
  animations:[
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class QuizPageComponent implements OnInit , OnDestroy {
  

  items = [1,2,3,4,5,6,7,8,9,0] 
  quizName:string = '';
   animationData = false;
  loading = false
  remainingTime:number = 0
  myTimerSub:any;
  user:any
  studentResponse:any ;
  quizData:any={}
  
  questionIndex:number=0
  sectionIndex:number = 0
  
  canEdit=true;
  isEditable = true;
   
  interval: any;
  
  constructor( private spinner:NgxSpinnerService,  private route:ActivatedRoute ,private router:Router ,private service:SupportService) {
         
   }
  
   
  
  ngOnInit(): void {
   
   this.service.currentUser.subscribe((data)=>{
     this.user = data
   }) 
  this.registerDOMEvents()
  //get Test details first and then load the test 
  
  this.route.queryParams.subscribe(params => {
     
  this.quizName = params.msg
  });


  let data:any = JSON.parse(localStorage.getItem(this.quizName)|| '{}')
   if( data !== {} &&  data.expireTime > Date.now()){
     
      console.log("Restored ... ") 
      this.remainingTime = data.remainingTime 
      this.quizData = data.quizData  
      this.questionIndex = data.qInd 
      this.sectionIndex = data.sec    
      this.isEditable = data.isEditable 
      this.canEdit = data.canEdit 
        
     
    
    }  
   

   else{
    this.service.getQuizByName(this.quizName , this.user.token).subscribe((data)=>{
        
      this.quizData = data[0]
      console.log(this.quizData) 
      this.remainingTime = (this.quizData.testDuration * 60)
      for(let i = 0 ; i < this.quizData.sections.length ; i++){
        this.quizData.sections[i].timeSpent = 0
      } 
    })
     
     
   }
    
    
 
     this.countdown()
    
    
     
  }


  ngOnDestroy(): void {
    
  } 
  
  trackQuestion(index:number , question:any){
      return question ? question.questionIndex : undefined;
  }

  beforeUnload(){
    console.log("On Destroy hook triggered")
  if(this.remainingTime > 0){
      this.saveSessionData()
     
   }
}


saveSessionData(){
  let x = JSON.parse(localStorage.getItem('savedQuizzes') || '[]') 
  x.push(this.quizName)
  localStorage.setItem('savedQuizzes' , JSON.stringify(x))
  let data:any = {}
  data.remainingTime = this.remainingTime
  data.quizData = this.quizData
  data.qInd = this.questionIndex
  data.sec  = this.sectionIndex
  let d1 = new Date(Date.now())
  d1.setHours(d1.getHours()+2)
  data.expireTime = d1
  localStorage.setItem(this.quizName , JSON.stringify(data))
}

  registerDOMEvents() {
    window.addEventListener('beforeunload',this.beforeUnload);
      
  }
  
  submitTest(){
     alert("Are you sure you wish to submit the test")
          let data = this.quizData
          data.sections.forEach((element: any) => {
            element.questions.forEach((x: any) => {
              delete x.questionFile
              delete x.optionFile
              delete x.style
            });
          });
            //stopTheTest
            data.isComplete = true
            
             
            localStorage.removeItem(this.quizName)
            window.removeEventListener('beforeunload' , this.beforeUnload)
           this.service.uploadQuiz(data, this.user.token).subscribe((data) =>{
             
             clearInterval(this.interval)
            this.spinner.show()
            setTimeout(()=>{
              this.spinner.hide()
              this.router.navigate(['/dashboard'])
             
            },5000)
               
           })
       
  }
  

  //  startTest(){
  //    this.canEdit = false;
  //   const ti = timer(1000 , 1000);
    
  //   this.myTimerSub = ti.subscribe(t => {
  //     //persist data on local storage every 60 seconds
  //     if(t % 40 === 0 && t > 0){
  //       console.log("Saving Data to local ...")
  //         let data:any = {}
  //         data.remainingTime = this.remainingTime
  //         data.quizData = this.quizData
  //         data.qInd = this.questionIndex
  //         data.sec  = this.sectionIndex
  //         data.isEditable = this.isEditable
  //         data.canEdit = this.canEdit
           
  //         localStorage.setItem("quizData" , JSON.stringify(data))
  //     }
  //       if(this.remainingTime <= 1)
  //       {
  //         let data = this.quizData
  //         delete data.questionFile
  //         delete data.optionFile
  //           //stopTheTest
  //           this.myTimerSub.unsubscribe()
  //           localStorage.clear()
  //          this.service.uploadQuiz(data , this.user.token).subscribe((data) =>{
              
  //            if(JSON.stringify(data).includes("error")){
  //             this.router.navigate(['/'])
  //            }
  //            else
  //               this.router.navigate(['/dashboard'])
  //          })
          
  //       }
  //        this.remainingTime -= 1
  //      })
 
  //  }



  changeQuestion(i:number, j:number){
    // let element:HTMLElement = document.getElementById("section_"+i) as HTMLElement;
    // console.log(element)
    // console.log("Changing . . . ")
    console.log(i , j)
    if(j < this.quizData.sections[this.sectionIndex].questions.length && i < this.quizData.sections.length){
        this.questionIndex = j
      this.sectionIndex = i
      // console.log(j)
      // console.log(this.quizData.sections[i].questions[j])
      this.animationData = !this.animationData
    }
    else if(j >= this.quizData.sections[this.sectionIndex].questions.length && i < this.quizData.sections.length - 1){
      this.questionIndex = 0
      this.sectionIndex = i+1
      this.animationData = !this.animationData
    }
  }
 
updateResponses(event:any){
  // this.quizData.sections[this.sec].questions[this.qInd].response = event
  // console.log(this.quizData.sections[this.sec].questions[this.qInd])
  console.log(event)
  if(event === "answered" || event === "mark")
  {
     
     this.changeQuestion(this.sectionIndex ,this.questionIndex + 1 )
  }
  
  
}

private countdown() {
  
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.quizData.sections[this.sectionIndex].timeSpent +=1
         
        this.remainingTime--;
        
        if(!(this.remainingTime % 60) && (this.remainingTime)){
            //save data to local
            this.saveSessionData()
        }
        
        if (this.remainingTime === 0) {
            this.navigateToSubmit()
         
        }
        
         
 
      }
    }, 1000);
   
}
  navigateToSubmit() {
          clearInterval(this.interval)
          let x = JSON.parse(localStorage.getItem('savedQuizzes') || '[]') 
          x.push(this.quizName)
          let data = this.quizData
          var index = x.indexOf(this.quizName);
          if (index !== -1) {
            x.splice(index, 1);
            localStorage.setItem('savedQuizzes' , JSON.stringify(x))
          }
          data.sections.forEach((element: any) => {
            element.questions.forEach((x: any) => {
              delete x.questionFile
              delete x.optionFile
              delete x.style
            });
          });
            //stopTheTest
            data.isComplete = true
            
             
            localStorage.removeItem(this.quizName)
            window.removeEventListener('beforeunload' , this.beforeUnload)
           this.service.uploadQuiz(data, this.user.token).subscribe((data) =>{
             
             
            this.spinner.show()
            setTimeout(()=>{
              this.spinner.hide()
              this.router.navigate(['/dashboard'])
             
            },5000)
               
           })
  }
 

}

 