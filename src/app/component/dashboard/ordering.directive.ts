import { Directive, ElementRef, Host, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appOrdering]'
})
export class OrderingDirective {
  @Input() order: any;
  @HostBinding('style.order') Order: string;

  dateInput;
  dateString;

  constructor() { }

  ngOnInit() {
    this.getTimeDifference();
  }

  private getTimeDifference() {
    this.dateString = this.order;
    let newDate = new Date(this.dateString);
    this.dateString = newDate.getTime();
    this.Order = this.dateString;
    console.log(this.dateString);
  }

}
