import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/services/admin.service';
import { SupportService } from 'src/services/support.service';

 

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['../login-page/login-page.component.css'], 
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
export class AdminLoginComponent implements OnInit {
  
  errResponse:any;
  loginGroup:any;
  constructor(private router: Router ,private service:AdminService, private _formBuilder: FormBuilder) { }

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
          
          this.router.navigate(['/admin'])
        }
      })
    }
  }

}
