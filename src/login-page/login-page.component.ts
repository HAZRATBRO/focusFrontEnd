import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
 import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from 'src/models/user';
import { SupportService } from 'src/services/support.service';
import { NgxSpinnerService } from 'ngx-spinner';
  
 
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl ): boolean {
     
    if (control && control.invalid 
        && (control.touched )) {
      return true;
    } else {
      console.log(this.checkUsernameValid(control.value))
      control.setErrors({'incorrect': true})
      return !this.checkUsernameValid(control.value);
    }
  }

 

  checkUsernameValid(val:string):boolean{
    
    if(val.length !== 6)
        {
          return false;
        }
    else{
        if(val.slice(0,3) ==="21B" && (parseInt(val.slice(3))!== NaN && (parseInt(val.slice(3)) >= 1 && parseInt(val.slice(3)) <= 300)) ){
          return true
        }
        
    }
    return false;
  }


}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'] , 
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
export class LoginPageComponent implements OnInit  {

  @Output() switch = new EventEmitter<string>();

  
  loading = false;
  errorStateMatcher: ErrorStateMatcher = new MyErrorStateMatcher();

  loginGroup:FormGroup;
  signupGroup:FormGroup;
  signup:boolean = false
  matcher = new MyErrorStateMatcher();
  errResponse:string = '' 
   constructor(private spinner:NgxSpinnerService,   private router: Router ,private service:SupportService, private _formBuilder: FormBuilder) {
     
    }
  
     
    toggle(event:any){
       this.signup = false
    }  
   
  

  ngOnInit(): void {
      
    this.loginGroup = this._formBuilder.group(
      {
        pass :new FormControl('' , [
          Validators.required,
           Validators.nullValidator,
           Validators.minLength(8)
        ]),
        username :new FormControl('', [
          Validators.required,
          Validators.nullValidator,
           
        ]) 

     }
     
    )

    this.signupGroup = this._formBuilder.group(
      {
        pass :new FormControl('' , [
          Validators.required,
           Validators.nullValidator,
           Validators.minLength(8)
        ]),
        emailFormControl :new FormControl('', [
          Validators.required,
          Validators.email,
        ]), 
        phoneNumber:new FormControl('' , [
          Validators.required,
           Validators.nullValidator,
           Validators.minLength(10),
           Validators.maxLength(10)
        ]),
        userName:new FormControl('' , [
          Validators.required,
            
        ])

     }
     
    ) 


  }


   
  submitSignup(){
    if(this.signupGroup.valid === true){
      //we have a valid submission
      let user = new User(this.signupGroup.controls.emailFormControl.value,this.signupGroup.controls.pass.value , this.signupGroup.controls.userName.value , this.signupGroup.controls.phoneNumber.value ,'',[],[])
       
      this.service.createNewUser(user).subscribe((data)=>{
        if(data.hasOwnProperty("errors")){
          this.errResponse = data.errors
        }
        else{

          this.router.navigate(['/'])
           
        }
      })

    
    }
  }
  

  submitSignin(){
     
    if(this.loginGroup.valid === true){
      //we have a valid submission
      let user = {"username":this.loginGroup.controls.username.value ,"password" :this.loginGroup.controls.pass.value }      
      this.service.signIn(user).subscribe((data)=>{
         
        if(data.hasOwnProperty("errors")){
          this.errResponse = data.errors
        }
        else{
          // localStorage.setItem("userToken" , data.token)
          this.router.navigate(['/ftseQuiz'])
        }
      })
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
