import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';
import { AdminService } from 'src/services/admin.service';

export class YourValidator {
  static dateVaidator(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD',true).isValid()) {
      return {'dateValidator': true};
    }
    return null;
  }
}


@Component({
  selector: 'app-create-playground',
  templateUrl: './create-playground.component.html',
  styleUrls: ['./create-playground.component.css']
})
export class CreatePlaygroundComponent implements OnInit {

  uploadList:any[] = [];
  sections:any[] = []
  firstFormGroup:FormGroup;
  quizName:string;
  isLinear = false;

  constructor(private adminService:AdminService,private _formBuilder: FormBuilder,private spinner:NgxSpinnerService,  private route:ActivatedRoute ,private router:Router ) { }

  markingSchema:any =  { notAttempted:0,
    SingleChoice:{
        fullMarks:3,
        negativeMarks:-1

    },
    MultipleChoice:{
        fullMarks:4,
        negativeMarks:-1 ,
        partialMarks:[1 , 2 , 3]

    },
    NumericalType:{
        fullMarks:4,
        negativeMarks:-1

    },
    FillInTheBlanks:{
        fullMarks:4,
        negativeMarks:0

    },
    ParagraphType:{
        fullMarks:3,
        negativeMarks:0
    },
    MatrixType:{
        fullMarks:8,
        negativeMarks:0
    }
}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
        
      this.quizName = params.msg
      });
      
      // if(this.quizName !== 'new'){
      //   this.adminService.getSingleTest(this.quizName).subscribe((data)=>{
      //     console.log(data)
          // this.firstFormGroup.setValue(
          //   {
          //     testName:data.testName , 
          //     numberOfSections:data.sections.length,
          //     testDuration:data.testDuration,
          //     validBefore:data.validBefore
          //   }
          // )
        
          

      //     this.sections = data.sections

      //   })
      // }
      if(this.quizName!=="new"){
        this.adminService.getSingleTest(this.quizName).subscribe((data)=>{
           
          this.firstFormGroup = this._formBuilder.group(
            {
              testName :new FormControl(data.testName , [
                Validators.required,
                 Validators.nullValidator
              ]),
              numberOfSections :new FormControl(data.sections.length, [
                Validators.required,
                Validators.nullValidator, 
              ]) , 
               testDuration:new FormControl(
                data.testDuration,[
                   Validators.required,
                   Validators.nullValidator
                 ]
               ),
               validBefore:new FormControl(data.validBefore.slice(0,10), [
                 Validators.required,
                 Validators.nullValidator,
                 YourValidator.dateVaidator
               ]),
               totalMarks:new FormControl(data.totalMarks, [
                Validators.required,
                Validators.nullValidator
              ])
      
           }
    
           
    
          )
          if(data.markingScheme !== undefined){
            this.markingSchema = data.markingScheme
          }

          this.sections = data.sections
        })
      }
      else{
      this.firstFormGroup = this._formBuilder.group(
        {
          testName :new FormControl('' , [
            Validators.required,
             Validators.nullValidator
          ]),
          numberOfSections :new FormControl('', [
            Validators.required,
            Validators.nullValidator, 
          ]) , 
           testDuration:new FormControl(
             '',[
               Validators.required,
               Validators.nullValidator
             ]
           ),
           validBefore:new FormControl('', [
             Validators.required,
             Validators.nullValidator,
             YourValidator.dateVaidator
           ]),
           totalMarks:new FormControl('', [
            Validators.required,
            Validators.nullValidator
          ])
       }

       

      )

      }
   
     
      
    
  }

   exit(){
     this.router.navigate(['/admin'])
   }
  checkValue(){
    console.log(this.firstFormGroup.value)
   }

  updateSections(){
      
    for(let i = this.sections.length ; i < this.firstFormGroup.controls.numberOfSections.value ; i++){
      this.sections.push({
        sectionName:"Section "+(i+1),
        sectionMarks:0,
        questions:[]
      })
    }
    console.log(this.sections)

  }

  addQuestion(sectionIndex:number){
    this.sections[sectionIndex].questions.push(
     { 
       response: {
          input: "",
         checkBox : []
      },
      type:"",
      optionFile:null,
      correctAnswer:"",
      questionIndex:(this.sections[sectionIndex].questions.length + 1)
    })
  }

  deleteQuestion(sectionIndex:number){
    this.sections[sectionIndex].questions.pop()
  }
  
  uploadTest(){
    let payload:any = {}
    payload.markingScheme = this.markingSchema
    
    this.firstFormGroup.value.sections = this.sections
    payload = this.firstFormGroup.value 
    
    payload.markingScheme = this.markingSchema
    console.log("Original payload")
    console.log(payload)
    
    this.adminService.uploadAdminTest(payload , this.quizName).subscribe((data)=>{
      if(data.hasOwnProperty("error")){
        alert("Please Try Again Later , facing Database Error")
      }
      else{
        console.log(data)
        this.router.navigate(['/admin'])
      }
    })

  }

  uploadToS3(quizData:any){
        
      // let testName = quizData.testName 
      // quizData.sections.forEach((section:any) => {
      //   let sectionName = section.sectionName
      //   section.questions.forEach((question:any , index:any) => {
      //       let fileName = testName + '/'+sectionName + '/'+index
      //       let s3URL = this.adminService.fileUploadService(question.optionFile ,fileName)
      //       question.optionFile = s3URL
      //   });

      // });
  }
}