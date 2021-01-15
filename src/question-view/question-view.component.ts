import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { dataChange } from 'src/animations/animation';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css'],
  animations: [
    dataChange
  ]
})
export class QuestionViewComponent implements OnInit,OnChanges {
  @Input()
  questionData:any
  
  @Output()
  onStateChange : EventEmitter<any> = new EventEmitter<any>();
  

  @Input() set data(data: any) {
    this.dataState = 'entering';
    this._data = data;
  }

  get data() { return this._data };

  _data: any;

  dataState: 'entering' | 'done' = 'done';

  onChange(option:any, isChecked: boolean) {
     
    if(isChecked && this.questionData.response.checkBox.findIndex((x: { value: any; }) => x == option)== -1) {
      this.questionData.response.checkBox.push(option);
    } else {
      let index = this.questionData.response.checkBox.findIndex((x: { value: any; }) => x == option)
      this.questionData.response.checkBox.splice(index);
    }
    console.log(this.questionData.response.checkBox)
  }
 
 exists(option:any){
  
  return !(this.questionData.response.checkBox.findIndex((x: { value: any; }) => x == option)== -1)
 }

  response:any
  input:string=''
  checkBox:any={ A: false, B: false, C: false, D: false}
  checked:boolean= false
  constructor(private _formBuilder: FormBuilder) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(JSON.stringify(changes).includes("questionData")){
      console.log("Question Data Changed")
    }
  }

  ngOnInit(): void {
    console.log(this.questionData)
    this.response = this._formBuilder.group({
     
      choiceList:[[]],
      input:['',Validators.required]
    });
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
  return /^\d+(\.\d{1,2})?$/.test(input);
  }
  
  saveResponse(){
      console.log(this.checkBox)
      console.log(this.input)
  }

  changeState(msg:string){
    console.log(msg)
    if(msg ==='answered' || msg==='mark')
    {
      if(msg === 'answered'){
        if(this.questionData.response.input === '' && this.questionData.response.checkBox.length ===0){
          this.questionData.style = 'notAnswered'
        }
        else{this.questionData.style = msg}
        
      }
     else{ 
      console.log(this.questionData.style+"Marking test")
       this.questionData.style = msg
      }
       this.onStateChange.emit(msg)
    }

    else if(msg === 'clear'){
      this.questionData.style = 'notAnswered'
     this.questionData.response.input=''
     this.questionData.response.checkBox = []  
    }
    
  }
}
