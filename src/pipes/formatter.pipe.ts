import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatter'
})
export class FormatterPipe implements PipeTransform {

   
  transform(time: number): string {
    const minutes: number = Math.floor(time / 60);
    const hrs : number = Math.floor(minutes/60)
    return ('00'+hrs).slice(-2) + ':' +('00' + Math.floor(minutes - hrs * 60)).slice(-2) + ':' + ('00' + Math.floor(time - minutes * 60)).slice(-2);
 
  }
}
