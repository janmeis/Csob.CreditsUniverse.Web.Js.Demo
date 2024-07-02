import { Component, Input } from '@angular/core';
import { BaseFilterCellComponent, FilterService } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, FilterOperator } from '@progress/kendo-data-query';
import *  as d from '@progress/kendo-date-math';

@Component({
  selector: 'app-grid-date-filter',
  templateUrl: './grid-date-filter.component.html',
  styles: `
  .dropdown-container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .fa.fa-times {
      z-index: 1;
      position: absolute;
      right: 2.8rem;
      top: .75rem;
      transform: scale(0.8);
      opacity: 0.75;
      &:hover {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
  `
})
export class GridDateFilterComponent extends BaseFilterCellComponent {
  @Input() override filter: CompositeFilterDescriptor = { logic: 'and', filters: [] };
  @Input() field = '';
  show = false;

  get selectedValue(): Date | null{
    const filter = this.filterByField(this.field);
    return filter && filter.value ? filter.value as Date : null;
  }

  constructor(filterService: FilterService) {
    super(filterService);
  }

  onRemoveFilterClick() {
    this.applyFilter(this.removeFilter(this.field));
  }

  onValueChange(value?: Date): void {
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
}
