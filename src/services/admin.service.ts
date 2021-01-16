import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  userToken:any = localStorage.getItem("adminToken");
  
  private isLoggedIn:BehaviorSubject<any>;
   private currentUserSubject: BehaviorSubject<any> ;  
  public currentUser: Observable<User>;
  public loggedInFlag: Observable<boolean>
 
  private url:string = "/focusAdmin"
  // private url:string = "http://localhost:3000/focusAdmin"
 
  

  constructor(private http:HttpClient) {
    let data = localStorage.getItem('currentUser') !== null?JSON.parse(localStorage.getItem('currentUser')||'{}'):null 
    this.currentUserSubject = new BehaviorSubject<User>(data);
    this.currentUser = this.currentUserSubject.asObservable();
    this.isLoggedIn = new BehaviorSubject<boolean>(false)
    this.loggedInFlag = this.isLoggedIn.asObservable()
   }

  getUserList(){
    const headers = new HttpHeaders().set('token', this.currentUserValue.token) 
    return this.http.get<any>(this.url+'/getUserList', {headers:headers} )
  }

  getAdminTests(){
    // const headers = new HttpHeaders().set('token', this.currentUserValue.token) 
    const headers = new HttpHeaders().set('token', this.currentUserValue.token) 
    
    return this.http.get<any>(this.url+'/getAllTests', {headers:headers} )
  }

  getSingleTest(testName:string){
    const headers = new HttpHeaders().set('token', this.currentUserValue.token) 
     
    return this.http.get<any>(this.url+'/getSingleTest?testName='+testName, {headers:headers } )
   
  }

  
  uploadAdminImages(data:any , testState:string){
    console.log("Uploading Quiz , Reaching Service ...")
   
    
    data.sections.forEach((section:any)=>{
      section.questions.forEach(async (question:any) => {
        
      console.log(question.optionFile)
      let response = await this.fileUploadService(question.optionFile.fileData ,question.optionFile.fileName) 
      console.log(response)
        delete question.optionFile
        question.optionFile = response.Location 
        console.log(question.optionFile) 
      
    });    
  })
    
  
   

 }
  
  uploadAdminTest(data :any , testState:string){
    console.log(data)
    const headers = new HttpHeaders().set('token', this.currentUserValue.token) 
    return this.http.post<any>(this.url +'/uploadTest?quizName='+testState , data , {headers:headers})
  
  }


  getResultsByTest(testName:string){
    const headers = new HttpHeaders().set('token', this.currentUserValue.token) 
     return this.http.get<any>(this.url+'/getResultByTest?testName='+testName , {headers:headers})
  }

  getResultByUser(userName:string){
    const headers = new HttpHeaders().set('token', this.currentUserValue.token) 
    return this.http.get<any>(this.url+'/getResultByUser?userName='+userName , {headers:headers})

  }

  getTest(testName:string){

  }

  signIn(data:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
     console.log("Yes") 
    return this.http.post<any>(this.url + '/adminLogin' , JSON.stringify(data) , httpOptions).pipe(
      map(user =>{
        
          localStorage.setItem('currentUser' , JSON.stringify(user))
          this.currentUserSubject.next(user)
          this.isLoggedIn.next(true)
          console.log(JSON.stringify(user) + "From Service")
          return user 
      })
    )
   }

   logout(){
     localStorage.clear()
     this.currentUserSubject.next(null)
     this.isLoggedIn.next(false)
     
   }

   get currentUserValue():any{
        return this.currentUserSubject.value
   }

   get loginStatus():any{
     return this.isLoggedIn.value
   }


 async  fileUploadService(fileData:any , fileName:string){
     const contentType = fileData.type
     let url:string ; 
     const bucket = new S3(
       {
         accessKeyId:this.access_key,
         secretAccessKey:this.private_key,
         region:'ap-south-1'
       }
     ) ;
     const params = {
       Bucket : 'focusquizzes',
       Key : fileName,
       Body : fileData ,
       ACL : 'public-read',
       ContentType:contentType
     }

      

     const response = bucket.upload(params).promise()
     return response;
   }

   
}
