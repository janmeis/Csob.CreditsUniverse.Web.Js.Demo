import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { DateInputComponent } from '@progress/kendo-angular-dateinputs';
import { BaseFilterCellComponent, FilterService } from '@progress/kendo-angular-grid';
import { PopupAnimation, PopupRef, PopupService } from '@progress/kendo-angular-popup';
import { CompositeFilterDescriptor, FilterOperator } from '@progress/kendo-data-query';
import { PopupCalendarComponent } from '../popup-calendar/popup-calendar.component';
import * as d from '@progress/kendo-date-math';

@Component({
  selector: 'app-grid-date-filter',
  templateUrl: './grid-date-filter.component.html',
  styles: ``
})
export class GridDateFilterComponent extends BaseFilterCellComponent {
  @Input() override filter: CompositeFilterDescriptor = { logic: 'and', filters: [] };
  @Input() field = '';
  @ViewChild('dateInputAnchor', { read: DateInputComponent }) dateInputAnchor: DateInputComponent | null = null;
  @ViewChild('inputGroupAnchor', { read: ElementRef }) inputGroupAnchor: ElementRef | null = null;
  private popupRef: PopupRef | null = null;
  private animate: PopupAnimation = { type: 'slide', duration: 200, direction: 'down' };

  get selectedValue(): Date | null {
    const filter = this.filterByField(this.field);
    return filter && filter.value ? filter.value as Date : null;
  }

  constructor(
    filterService: FilterService,
    private popupService: PopupService) {
    super(filterService);
  }

  togglePopup(dateInputAnchor?: ElementRef | HTMLElement): void {
    if (this.popupRef) {
      this.popupRef.close();
      this.popupRef = null;
    } else {
      this.popupRef = this.popupService.open({
        anchor: dateInputAnchor,
        content: PopupCalendarComponent,
        animate: this.animate,
      });
      this.popupRef.content.instance.popupRef = this.popupRef;
      this.popupRef.content.instance.value = this.selectedValue;
      this.popupRef.popupClose.subscribe(() => {
        const value = this.popupRef?.content.instance.value;
        this.setFilter(value);
      });
    }
  }

  @HostListener('document:keydown', ['$event'])
  public keydown(event: KeyboardEvent): void {
    if (event.code === 'Escape' && this.popupRef) {
      this.popupRef.close();
      this.popupRef = null;
    }
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: PointerEvent): void {
    if (!this.contains((event as any).target) && this.popupRef) {
      this.popupRef.close();
      this.popupRef = null;
    }
  }

  onRemoveFilterClick() {
    this.applyFilter(this.removeFilter(this.field));
  }

  onValueChange(value?: Date): void {
    if (this.popupRef) {
      this.popupRef.close();
      this.popupRef = null;
    }
    this.setFilter(value);
  }

  private setFilter(value: Date | undefined) {
    const filter = this.removeFilter(this.field);
    if (value !== null) {
      filter.filters = [...filter.filters, {
        field: this.field,
        operator: FilterOperator.GreaterThanOrEqual,
        value: value
      }, {
        field: this.field,
        operator: FilterOperator.LessThan,
        value: d.addDays(value as Date, 1)
      }];
    }

    this.applyFilter(filter);
  }

  private contains(target: EventTarget): boolean {
    return (
      (this.dateInputAnchor && this.dateInputAnchor.inputElement.contains(target)) ||
      (this.inputGroupAnchor && this.inputGroupAnchor.nativeElement.contains(target)) ||
      (this.popupRef && this.popupRef?.popup.location.nativeElement.contains(target))
    );
  }
}
