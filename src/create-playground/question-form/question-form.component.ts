import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/services/admin.service';
 
@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  
  selectedFiles:FileList;
  url:any;

  @Input()
  uploadList:any[]

  @Input()
  testName:string; 

  @Input()
  questionData:any

  @Input()
  sectionName:string

   
  @Output()
  onDeleteSelf :  EventEmitter<any> = new EventEmitter<any>(); 

    questionDetails:any;
  
  
   

  deleteSelf(){
    this.onDeleteSelf.emit({index:this.questionData.questionIndex , sectionName:this.sectionName})
  }
  
  constructor(private adminService:AdminService,private _formBuilder: FormBuilder ,  private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
     
  }

   
   
  openFileBrowser(id:string){
     
    let element:HTMLElement = document.getElementById(id+"_"+this.questionData.questionIndex+"_"+this.sectionName) as HTMLElement;
    element.click();
  }


  async onFileChange(event:any ){
        this.selectedFiles = event.target.files
        var reader = new FileReader();

          reader.onload = (event:any) => {
              this.url = event.target.result;
          }

        reader.readAsDataURL(event.target.files[0]);


        let response = await this.adminService.fileUploadService(this.selectedFiles.item(0) ,this.testName +'/' + this.sectionName + '/' + this.selectedFiles.item(0)?.name) 
    
        this.questionData.optionFile = response.Location
        console.log(this.questionData.optionFile)
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
  
  

