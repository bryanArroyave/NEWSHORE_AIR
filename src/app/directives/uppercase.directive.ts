/* eslint-disable no-useless-constructor */
import {
  ElementRef,
  Directive
} from '@angular/core';

@Directive({ selector: '[appUppercase]' })
export class UppercaseDirective {
  constructor(public el: ElementRef) {
    this.el.nativeElement.style.textTransform = 'uppercase';
  }
}
