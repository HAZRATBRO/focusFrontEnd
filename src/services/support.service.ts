import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
 
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  
   userToken:any = localStorage.getItem("userToken");
   

   private isLoggedIn:BehaviorSubject<any>;
   private currentUserSubject: BehaviorSubject<any> ;
   public currentUser: Observable<User>;
   public loggedInFlag: Observable<boolean>
  private url:string = "http://localhost:8080/focus"
  constructor(private spinner:NgxSpinnerService, private http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')|| '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.isLoggedIn = new BehaviorSubject<boolean>(false)
    this.loggedInFlag = this.isLoggedIn.asObservable()
  }
  
  getCompletionStatus(data:any):Observable<any>{
    const headers = new HttpHeaders().set('token', this.currentUserValue.token) 
   return this.http.post<any>(this.url + '/completionStatus' , data , {headers:headers})
  }

  getClassStatistic(data:any):Observable<any>{
    const headers = new HttpHeaders().set('token', this.currentUserValue.token) 
    console.log(data)
    console.log("Responses" + " " + this.currentUserValue.token)
    return this.http.post<any>(this.url+'/getClassStatistics' ,data ,{"headers":headers})
 
  }
    getUserResponse(data:any):Observable<any>{
    const headers = new HttpHeaders().set('token', this.currentUserValue.token) 
      console.log(data)
    console.log("Responses" + " " + this.currentUserValue.token)
    return this.http.post<any>(this.url+'/getQuizResponse' ,data ,{"headers":headers})
  }


  populateUser(token:any):Observable<any>{
    const headers = new HttpHeaders().set('token', token) 

    return this.http.get<any>(this.url+'/getUser' , {"headers":headers})
  }

  public getAllUserResponses(token:any):Observable<any>{
    const headers = new HttpHeaders().set('token', token) 
    console.log("Responses" + " " + token)
    return this.http.post<any>(this.url+'/getAllQuizResponse' ,{} ,{"headers":headers})
  }


  public  getAllCourseQuizzes(data:any,token:any):Observable<any>{
    const headers = new HttpHeaders().set('token', token) 
    var body = {"testNames":data}
     
    
    //get all quizzes
   return this.http.post<any>(this.url + '/getAllCourseQuizzes',body , {"headers":headers}) 
    
  }

  public getCourseTestList(data:any , token:any):Observable<any>{
    const headers = new HttpHeaders().set('token', token) 
    var body = {"courseName":data}
    return this.http.post<any>(this.url + '/getCourseTestList', {headers:headers})
  }

  private async matchQuizResponses(data:any , token:string){
    const headers = new HttpHeaders().set('token', token) 
    var body = {"testNames":data}
     
    
    //get all quizzes
   const response = await this.http.post<any>(this.url + '/matchQuizResponses',body , {"headers":headers}).toPromise() 
    return response
  } 


  filterQuizResponses(data:any , token:string){
    const headers = new HttpHeaders().set('token', token) 
     
    var result:number = 0
    let quizResponses:any   
   let allQuizzes:any 
    
    //get all quizzes
     allQuizzes =  this.getAllCourseQuizzes(data , token)
     
    //get quiz responses
    quizResponses =  this.matchQuizResponses(data, token)

     
    
    if( quizResponses === undefined|| quizResponses.length === 0){
       
      return {"allQuizzes": allQuizzes , "courseCompletion":0,"userResponses":[]}
      }
      else{
        console.log(allQuizzes[1] , quizResponses,data)
        for(let i = 0 ; i < data.length ; i++){
          if(data[i] ===  allQuizzes[i].testName){
            result+=1
           
          }
           
        }
        for(let i = 0 ; i <  quizResponses.length ; i++){
         if( quizResponses[i].testName ===  allQuizzes[i].testName){
            
           allQuizzes.splice(i , 1)
          }
        }
        
      }
     return  {"courseCompletion":(result/ quizResponses.length) , "userResponses": quizResponses , "allQuizzes": allQuizzes}

  }


  enrollUser(data:any):Observable<any>{
    console.log(data.token)
    const headers = new HttpHeaders().set('token', data.token).set( 'Content-Type',  'application/json')
    delete data.token
    console.log(data)
    return this.http.post<any>(this.url + '/enrollToCourse' , {"headers":headers})
  }

  getDashboardCourses(data:any):Observable<any>{
    const headers = new HttpHeaders().set('token', data.token)
     
    return this.http.get(this.url + '/getCourses' ,{"headers":headers})
  }

  getEnrolledCourses(data:any):Observable<any>{
    const headers = new HttpHeaders().set('token', data.token)
    return this.http.get<any>(this.url + '/getEnrolledCourses',{"headers":headers})
  }
  getAllQuizSets(){
    return this.http.get<any>(this.url+"/getAllQuizzes")
  }
   
  getQuizByName(quiz:string , token:string):Observable<any>{
    const headers = new HttpHeaders().set('token', token).set( 'Content-Type',  'application/json')
    return this.http.get<any>(this.url+'/getQuiz/'+quiz , {"headers":headers})
  }
  
  
  getFTSEQuiz():Observable<any>{
    const headers = new HttpHeaders().set('token', this.currentUserValue.token).set( 'Content-Type',  'application/json')
    return this.http.get<any>(this.url+'/getFTSEQuiz' , {"headers":headers})
  }
  saveQuiz(data:any , token:string): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token':token
      })
    };
    console.log(data)
    return this.http.post<any>(this.url + "/createQuiz" , data,httpOptions)
  }

  uploadQuiz(data:any , token:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token':token
      })
    };
    console.log(data)
    return this.http.post<any>(this.url + "/uploadUserQuiz" , data,httpOptions)
  }

   getDashboardQuizzes():Observable<any>{
      return this.http.get<any>(this.url +'/getQuizResponse')
   }
   

   createNewUser(data:User):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    console.log(data)
    return this.http.post<any>(this.url + '/signup' , JSON.stringify(data) , httpOptions)
   }

   signIn(data:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
      
    return this.http.post<any>(this.url + '/login' , JSON.stringify(data) , httpOptions).pipe(
      map(user =>{
          localStorage.setItem('currentUser' , JSON.stringify(user))
          this.currentUserSubject.next(user)
          this.isLoggedIn.next(true)
          return user
      })
    )
   }

   logout(){
     localStorage.removeItem("currentUser")
     localStorage.removeItem("userToken")
     this.currentUserSubject.next(null)
     this.isLoggedIn.next(false)
     
   }

   get currentUserValue():any{
        return this.currentUserSubject.value
   }

   get loginStatus():any{
     return this.isLoggedIn.value
   }
}
