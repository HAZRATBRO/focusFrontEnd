import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
visible:Observable<boolean>;

constructor(){
  this.visible = of(true)
}

hide(){
  this.visible = of(false)
}

show(){
  this.visible = of(true)
}

toggle(){
  this.visible = of(!this.visible)
}

}