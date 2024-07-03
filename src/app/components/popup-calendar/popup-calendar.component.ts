import { Component } from '@angular/core';
import { PopupRef } from '@progress/kendo-angular-popup';

@Component({
  selector: 'app-popup-calendar',
  templateUrl: './popup-calendar.component.html',
  styles: ``
})
export class PopupCalendarComponent {
  value: Date = new Date();
  popupRef: PopupRef | null = null;

  onValueChange(value: Date): void {
    this.value = value;
    this.popupRef?.close();
    this.popupRef = null;
  }
}
