import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faculty-card',
  templateUrl: './faculty-card.component.html',
  styleUrls: ['../faculty.component.scss'],

  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ overflow:'hidden', height:0,opacity: 0 }),
            animate(500, 
                    style({  opacity: 1 ,height:'*'}))
          ]
        ),
        transition(
          ':leave', 
          [
            style({  overflow:'hidden', height:'*',opacity: 1 }),
            animate(500, 
                    style({ opacity: 0 ,height:0}))
          ]
        )
      ]
    )
  ]
})
export class FacultyCardComponent implements OnInit {
  next=true;
  constructor() { }

  ngOnInit(): void {
  }
  toggle(){
    this.next=!this.next
    console.log(this.next)
  }
}
