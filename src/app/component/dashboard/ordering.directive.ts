import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appOrdering]'
})
export class OrderingDirective {
  @Input('appOrdering') order: any;
  @HostBinding('style.order') Order: string;
  dateInput;
  dateString;
  newDate;
  dates;
  constructor() { }

  ngOnInit() {
    this.dateString = this.order;
    this.newDate = new Date(this.dateString);
    this.dates = this.newDate.getTime() / 10000;
    this.Order = this.dates;
  }
}

