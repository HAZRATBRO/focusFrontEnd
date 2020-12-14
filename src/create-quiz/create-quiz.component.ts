import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SupportService } from 'src/services/support.service';
 
@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'] ,
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
export class CreateQuizComponent implements OnInit {
  quiz:any =  {};
  fileObject:any = {};
  quizDetails:any ;
  createQuestions:any ;
  isEditable = true;
  quizSections:any = [] 
  questions:any = []
  questionId:number=0
  user: any ;
  
  constructor(private _formBuilder: FormBuilder , private service:SupportService) { }

  ngOnInit(): void {
    this.quizDetails = this._formBuilder.group({
      quizName: ['', [Validators.required]],
      quizDuration:['' , [Validators.required ]],
      numSections:['',Validators.required]
    });
    this.service.currentUser.subscribe((data)=>this.user=data)
  }
 createVal(){
    this.quiz.testName = this.quizDetails.controls.quizName.value;
    this.quiz.testDuration = this.quizDetails.controls.quizDuration.value
    this.quiz.sections = []
    if(this.quizSections.length == 0){
    for(let i = 0 ; i < parseInt(this.quizDetails.controls.numSections.value);i++){
     
      this.quizSections.push( this._formBuilder.group({
           sectionName:["Section " + (i+1) ,Validators.required],
      }))
      this.quiz.sections.push({name:"Section " + (i+1)})
      

    }
    for(let i = 0 ;i < parseInt(this.quizDetails.controls.numSections.value);i++){
      this.quiz.sections[i].questions = []
        this.quiz.sections[i].questionId = 0
      this.quizSections[i].get('sectionName').valueChanges.subscribe((val: any) => {
         
        this.quiz.sections[i].name = val
        
    });
    }
    console.log(this.quiz)
  } 
    console.log(this.quizSections)
 }
 deleteThis(section:string  , questionIndex:number){
  const index = this.quiz.sections.indexOf(this.quiz.sections.find((item: { name: string; }) => item.name === section))
  
  if (index !== -1) {
    this.quiz.sections[index].questions.splice(questionIndex, 1);
  } 
 }
 addElement(section:string ){
   console.log(this.quiz)
     const index = this.quiz.sections.indexOf(this.quiz.sections.find((item: { name: string; }) => item.name === section))
     
    console.log(index)
    this.quiz.sections[index].questions.push({questionIndex:this.quiz.sections[index].questionId})
    this.quiz.sections[index].questionId+=1
    //  this.quiz.sections[index].controls.questionList.value.push(this.quizSections[index].controls.questionIndex.value)
    //  this.quizSections[index].controls.questionIndex.value += 1
 }

 appendQuestion(section:string , event:any , id:number){
  const index = this.quiz.sections.indexOf(this.quiz.sections.find((item: { name: string; }) => item.name === section))
  // const questionIndex = this.quiz.sections[index].questions.indexOf(this.quiz.sections[index].questions.find((item : {questionIndex : number}) => item.questionIndex === id))

  this.quiz.sections[index].questions[id] = event
  console.log(JSON.stringify(this.quiz))
  console.log(event)
   // this.quiz.sections[index].questions   
 }
 
  submit(){
    //upload the data
    console.log(this.quiz)
    this.service.saveQuiz(this.quiz , this.user.token).subscribe((data)=>{
      console.log(data)
    })
  }

 public validate(e:any){
  let input;
if (e.metaKey || e.ctrlKey) {
  return true;
}
if (e.which === 32) {
 return false;
}
if (e.which === 0) {
 return true;
}
if (e.which < 33) {
  return true;
}
input = String.fromCharCode(e.which);
return !!/[\d\s]/.test(input);
}


}
