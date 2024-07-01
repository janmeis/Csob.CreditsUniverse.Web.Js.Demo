import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { CheckBoxComponent } from '@progress/kendo-angular-inputs';
import { CompositeFilterDescriptor, filterBy, FilterDescriptor, State } from '@progress/kendo-data-query';
import { sampleProducts } from './products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit{
  title = 'Csob.CreditsUniverse.Web.Js.Demo';

  phoneNumberValue: string = '';
  phoneNumberMask: string = '(999) 000-00-00-00';
  now = new Date();

  form: FormGroup = new FormGroup({});

  data: any = {
    fullName: '',
    email: '',
    phoneNumber: this.phoneNumberValue,
    arrivalDate: null,
    numberOfNights: null,
    numberOfGuests: null,
    terms: false,
    comments: ''
  };
  gridData: GridDataResult = { data: [], total: 0 };

  filter: CompositeFilterDescriptor = {
    logic: 'and',
    filters: []
  };

  grid = {
    skip: 0,
    take: 5
  } as State;

  ngOnInit(): void {
    this.form = new FormGroup({
      fullName: new FormControl(this.data.fullName, [Validators.required]),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.data.phoneNumber, [Validators.required]),
      arrivalDate: new FormControl(this.data.arrivalDate, [Validators.required]),
      numberOfNights: new FormControl(this.data.numberOfNights, [Validators.required]),
      numberOfGuests: new FormControl(this.data.numberOfGuests, [Validators.required, Validators.max(5)]),
      terms: new FormControl(this.data.terms, [Validators.requiredTrue]),
      comments: new FormControl(this.data.comments)
    });

    this.now.setHours(0, 0, 0, 0);
    this.loadData();
  }

  submitForm(): void {
    this.form.markAllAsTouched();
  }

  clearForm(): void {
    this.form.reset();
  }

  pageChange(pageChange: PageChangeEvent) {
    this.grid = { ...this.grid, ...pageChange };
    this.loadData();
  }

  filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.loadData();
  }

  onCheckedStateChange(checkboxFilter: CheckBoxComponent): void {
    let checkedState = checkboxFilter.checkedState;
    const prevFilter = (this.filter.filters.find((f) => (f as FilterDescriptor).field === 'Discontinued') as FilterDescriptor)?.value as boolean | undefined;
    let filters = [...this.filter.filters.filter((f) => (f as FilterDescriptor).field !== 'Discontinued')];
    if (checkedState === true && prevFilter === false)
      checkboxFilter.checkedState = 'indeterminate';
    else {
      if (checkedState === false && prevFilter === undefined) {
        checkedState = true;
        checkboxFilter.checkedState = checkedState;
      }

      filters = [...filters, { field: 'Discontinued', operator: 'eq', value: checkedState }];
    }
    const filter = { logic: 'and', filters };
    this.filterChange(filter as CompositeFilterDescriptor);
  }

  loadData(): void {
    const data = filterBy(sampleProducts, this.filter) || [];
    this.gridData = {data: data.slice(this.grid.skip || 0, (this.grid.skip || 0) + (this.grid.take || 5)), total: data.length};
  }
}
