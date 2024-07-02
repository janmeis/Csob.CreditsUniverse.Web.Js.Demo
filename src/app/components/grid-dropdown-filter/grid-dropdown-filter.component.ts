import { Component, Input } from '@angular/core';
import { BaseFilterCellComponent, FilterService } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'app-grid-dropdown-filter',
  templateUrl: './grid-dropdown-filter.component.html',
  styles: ``
})
export class GridDropdownFilterComponent extends BaseFilterCellComponent {
  @Input() override filter: CompositeFilterDescriptor = { logic: 'and', filters: [] };
  @Input() field = '';
  @Input() data: { text: string, value: number; }[] = [];

  get selectedValue(): number | null {
    const filter = this.filterByField(this.field);
    return filter && filter.value ? +filter.value  : null;
  }

  constructor(filterService: FilterService) {
    super(filterService);
  }

  onValueChange(value?: number): void {
    this.applyFilter(
      !value
        ? this.removeFilter(this.field)
        : this.updateFilter({
          field: this.field,
          operator: 'eq',
          value: value
        })
    );
  }
}
