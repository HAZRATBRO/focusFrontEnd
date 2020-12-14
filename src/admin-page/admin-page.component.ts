import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupportService } from 'src/services/support.service';

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
   testSets=null 
  constructor(private service:SupportService , private router:Router) { }

  ngOnInit(): void {
    this.service.getAllQuizSets().subscribe((data)=>{
      this.testSets = data
      console.log(data)
    })

  }

  createNewQuiz(){
    this.router.navigateByUrl('createQuiz')
  }

}
