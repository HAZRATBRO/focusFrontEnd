import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  @Input()
  questionId:number=-1
  
  @Input()
  section:string=""

  @Output()
  onQuestionSend: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onDeleteSelf :  EventEmitter<any> = new EventEmitter<any>(); 

  singleChoice:string= '' 
  question:any = {response:{input:"" , checkBox:[]}};
  questionDetails:any;
  
  
  sendQuestion(){
     this.question.type = this.questionDetails.controls.questionType.value
    this.question.optionFile = this.questionDetails.controls.optionFile.value
    if(this.question.type === "MultipleChoice"){
      this.question.correctAnswer = this.questionDetails.controls.correctAnswer.value.split(",")    
    }
    else if(this.question.type === "SingleChoice"){
      this.question.correctAnswer = this.singleChoice
    }
    else{
      this.question.correctAnswer = this.questionDetails.controls.correctAnswer.value
    }
      this.question.questionFile = this.questionDetails.controls.questionFile.value
    this.question.questionIndex = this.questionId
    this.onQuestionSend.emit(this.question)
  }

  deleteSelf(){
    this.onDeleteSelf.emit(this.questionId)
  }
  
  constructor(private _formBuilder: FormBuilder ,  private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.questionDetails = this._formBuilder.group({
      questionType: ['', [Validators.required]],
      questionFile:[null , [Validators.required ]],
      optionFile:[null ],
      correctAnswer:['',Validators.required],
     });
    console.log(this.questionId)
  }

   
   
  openFileBrowser(id:string){
     
    let element:HTMLElement = document.getElementById(id+"_"+this.questionId+"_"+this.section) as HTMLElement;
    element.click();
  }


  onFileChange(event:any , key:string){
    const reader = new FileReader();
      
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
         if(key==="question"){
        this.questionDetails.patchValue({
          questionFile: reader.result
       });
      }
      else{
         
         this.questionDetails.patchValue({
           optionFile : reader.result
         })
      }
      console.log(this.questionDetails.controls)
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  

    

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
  
  

