import { trigger, state, style, transition, animate } from '@angular/animations';
import { PlatformLocation } from '@angular/common';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SupportService } from 'src/services/support.service';
import { ToolbarService } from 'src/services/toolbar.service';
 
@Component({
  selector: 'app-ftse-quiz-page',
  templateUrl: './ftse-quiz-page.component.html',
  styleUrls: ['./ftse-quiz-page.component.css']
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
export class FtseQuizPageComponent implements OnInit {

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
 elem:any
   
 interval: any;
 warningCount:number = 0
 
 cheatingCount:any = 0 
 
//  @HostListener('document:visibilitychange' , ['$event'])
//  cheating(event:any){
//    console.log(event)
//    if(event.originalTarget.URL.split('/').includes(this.quizName)){
//      !document.hidden?(this.cheatingCount+=1):'Hey'
//       if(this.cheatingCount <= 2){
//         alert("Your result will be submitted if you redirect again")
//       }
//       else {
//         this.submitForced()
//       }
//  }
// }
//  @HostListener('window:beforeunload' , ['$event'])
//  cheatCheck(event:any){
//     localStorage.setItem("cheatingCount",this.cheatingCount)
//     console.log(this.cheatingCount)
//  }
 
  

//event listener for detecting tab changes if any for warning
 
//event listeners to block source view
@HostListener('window:keydown', ['$event'])
  keyboardInput(event: any) {
    // event.preventDefault();
    event.stopPropagation();

     const e = <KeyboardEvent>event;

    const charCode = e.which ? e.which : e.keyCode;
     if (e.ctrlKey && e.ctrlKey) {
      //  console.log("found")
       return false};
     console.log(charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode < 96 || charCode > 105) {
      return false;
    }
    return true;
  }
  
 @HostListener('contextmenu', ['$event'])
 onRightClick(event:any) {
   event.preventDefault();
 }




 constructor( private toolbarService:ToolbarService ,private spinner:NgxSpinnerService,  private route:ActivatedRoute ,private router:Router ,private service:SupportService) {
      //  this.location.onPopState(() => {
      //    private location: PlatformLocation console.log("Triggered")
      //   this.toolbarService.show();
      //     this.router.navigate([this.location.getBaseHrefFromDOM()]) 
      //   }); 
  }
   
 
 ngOnInit(): void {
  
      this.toolbarService.hide();

      // this.cheatingCount = localStorage.getItem("cheatingCount") == null ? 0:parseInt(localStorage.getItem("cheatingCount")||'0')  

      this.elem = document.documentElement
    
      this.service.currentUser.subscribe((data: any)=>{
        this.user = data
      }) 
    this.registerDOMEvents()
    //get Test details first and then load the test 
    
    this.route.queryParams.subscribe((params) => {
        
    this.quizName = params.msg
    });

    let str = localStorage.getItem(this.quizName) !== null?localStorage.getItem(this.quizName):'{}'

    let data:any = JSON.parse(str||'')
    // console.log(data)
  if(!( Object.keys(data).length === 0 && data.constructor === Object)  &&  Date.parse(data.expireTime) > Date.now()){
    
     console.log("Restored ... ") 
     this.remainingTime = data.remainingTime 
     this.quizData = data.quizData  
     this.questionIndex = data.qInd 
     this.sectionIndex = data.sec    
         
    
   
   }  
  

  else{
   this.service.getFTSEQuiz(this.quizName).subscribe((data: any)=>{
       
     this.quizData = data
    //  console.log(this.quizData) 
     this.remainingTime = (this.quizData.testDuration * 60)
     for(let i = 0 ; i < this.quizData.sections.length ; i++){
       this.quizData.sections[i].timeSpent = 0
     } 
   })
    
    
  }
   
   

    this.countdown()
   
   
    
 }
   
 trackQuestion(index:number , question:any){
  return question ? question.questionIndex : undefined;
}

beforeUnload(){
  // console.log("On Destroy hook triggered")
  this.toolbarService.show();
  if(this.remainingTime > 0){
    this.saveSessionData()
  
  }
}

 
saveSessionData(){
      let x = JSON.parse(localStorage.getItem('savedQuizzes') || '[]') 

      if (!x.includes(this.quizName))
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
   var response = window.confirm("Are you sure you wish to submit the test");
   if(response === true){
      let data = this.quizData
      data.sections.forEach((element: any) => {
        element.questions.forEach((x: any) => {
           
          delete x.optionFile
           
        });
      });
        //stopTheTest
        data.isComplete = true
        console.log(data)
        localStorage.removeItem(this.quizName)
        localStorage.removeItem("cheatingCount")
        window.removeEventListener('beforeunload' , this.beforeUnload)
        this.service.uploadQuiz(data, this.user.token).subscribe((data: any) =>{
         
         clearInterval(this.interval)
        this.spinner.show()
        setTimeout(()=>{
          this.spinner.hide()
          this.toolbarService.show()
          this.router.navigate(['/ftseQuiz'])
         
        },3000)
           
       })
     
      }else{
        return
      }

}
submitForced(){
        let data = this.quizData
       data.sections.forEach((element: any) => {
         element.questions.forEach((x: any) => {
            
           delete x.optionFile
            
         });
       });
         //stopTheTest
         data.isComplete = true
        //  console.log(data)
         localStorage.removeItem(this.quizName)
         window.removeEventListener('beforeunload' , this.beforeUnload)
         this.service.uploadQuiz(data, this.user.token).subscribe((data: any) =>{
          
          clearInterval(this.interval)
         this.spinner.show()
         setTimeout(()=>{
           this.spinner.hide()
           this.toolbarService.show()
           this.router.navigate(['/ftseQuiz'])
          
         },3000)
            
        })
    
 }
changeQuestion(i:number, j:number){
  // let element:HTMLElement = document.getElementById("section_"+i) as HTMLElement;
  // console.log(element)
  // console.log("Changing . . . ")
  // console.log(i , j)
  if(j < this.quizData.sections[this.sectionIndex].questions.length && i < this.quizData.sections.length){
    
    
      if(this.quizData.sections[this.sectionIndex].questions[this.questionIndex].response.input === '' && this.quizData.sections[this.sectionIndex].questions[this.questionIndex].response.checkBox.length === 0){
        if(this.quizData.sections[this.sectionIndex].questions[this.questionIndex].style !== 'mark'){ 
          this.quizData.sections[this.sectionIndex].questions[this.questionIndex].style = 'notAnswered'
      }
      }
    else{
      if(this.quizData.sections[this.sectionIndex].questions[this.questionIndex].style !== 'mark'){
      this.quizData.sections[this.sectionIndex].questions[this.questionIndex].style = 'answered'
    }
  }
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
// console.log(event)
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
        if (!x.includes(this.quizName))
          x.push(this.quizName)
        let data = this.quizData
        var index = x.indexOf(this.quizName);
        if (index !== -1) {
          x.splice(index, 1);
          localStorage.setItem('savedQuizzes' , JSON.stringify(x))
        }
        data.sections.forEach((element: any) => {
          element.questions.forEach((x: any) => {
            
            delete x.optionFile
            delete x.style
          });
        });
          //stopTheTest
          data.isComplete = true
          
           
          localStorage.removeItem(this.quizName)
          window.removeEventListener('beforeunload' , this.beforeUnload)
         this.service.uploadQuiz(data, this.user.token).subscribe((data: any) =>{
           
           
          this.spinner.show()
          setTimeout(()=>{
            this.spinner.hide()
            this.toolbarService.show()
            this.router.navigate(['/ftseQuiz'])
           
          },3000)
             
         })
}



}
