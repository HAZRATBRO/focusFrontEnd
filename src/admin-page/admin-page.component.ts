import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/services/admin.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
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
export class AdminPageComponent implements OnInit {
  
  testData:any ;
  testResults:any;
  tableName  = 'option';
  tableResult:any[] = [];
  tableHeaderData:any;
  studentResults:any;
  userList:any;
  

   


  constructor(private spinner:NgxSpinnerService , private service:AdminService , private router:Router) { }
  
  exportToExcel():void{

    let element = document.getElementById('excel-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook  = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(wb , ws ,'Sheet1');

    XLSX.writeFile(wb , 'Result.xlsx')
  }


  collectScore(event:any){
    this.tableName = event
     
    
    this.service.getResultsByTest(this.tableName).subscribe((data)=>{
      this.testResults = data
      console.log(data)
      this.tableResult = []
      //compile and clean the results
      this.testResults.forEach((result:any) => {
          
          let totalMarks = 0
          let sectionMarks:any[] = []
          result.userResponses[0].sections.forEach((section:any) => {
            let marks = 0
            section.questions.forEach((question:any) => {
              marks += question.marksAwarded 
            });
            sectionMarks.push(
             marks
            )
            totalMarks+=marks 
          });
          console.log(totalMarks)
          this.tableResult.push({
            userName:result.userName,
            totalMarks:totalMarks,
            sectionWiseMarks:sectionMarks
          })
    })
     console.log(this.tableResult)
     this.tableResult.sort((a,b)=> b.totalMarks-a.totalMarks)
  })
  
     
  console.log(this.tableResult)
}
  ngOnInit(): void {
     this.service.getAdminTests().subscribe((data)=>{
       console.log(data)
       this.testData = data  
      });

       this.service.getUserList().subscribe((data)=>{
         this.userList = data
       }) 
  }
  
  printList(event:any){
    console.log(event.option.value)
    
    this.router.navigate(['/studentData'],{queryParams: {"msg":  event.option.value}})
  }
  onTestUpdate(testName:string){
    if(testName === "new"){
      this.router.navigate(['/createPlayground'],{queryParams: {"msg": "new"}})
    }
    else{
      this.router.navigate(['/createPlayground'],{queryParams: {"msg": testName}})
    }
  } 

  logout(){
    this.service.logout()
    this.spinner.show()
    setTimeout(()=>{
      this.router.navigate(['/']) 
      this.spinner.hide() 
    },2000)
  }
}
