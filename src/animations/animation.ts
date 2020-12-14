import { animate, animateChild, animation, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const dataChange: AnimationTriggerMetadata = trigger('dataChange', [
    transition('done => entering', [
        style({
            'margin-left': '90%'
        }),
        animate('300ms ease',
            style({ 'margin-left': '*' }))
    ]),
]);
 