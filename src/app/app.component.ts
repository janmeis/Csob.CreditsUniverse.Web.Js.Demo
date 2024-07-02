import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { CheckBoxComponent } from '@progress/kendo-angular-inputs';
import { CompositeFilterDescriptor, distinct, FilterDescriptor, process, State } from '@progress/kendo-data-query';
import { sampleProducts } from './products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
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

  state = {
    skip: 0,
    take: 10,
    sort: [],
    filter: {
      logic: 'and',
      filters: []
    } as CompositeFilterDescriptor
  } as State;

  categories: { text: string, value: number; descripiton: string}[] = [];

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
    this.categories = this.getCategories();
    console.log(this.categories);
  }

  submitForm(): void {
    this.form.markAllAsTouched();
  }

  clearForm(): void {
    this.form.reset();
  }

  getCategories(): { text: string, value: number; descripiton: string; }[] {
    const categories =sampleProducts.map(p => p.Category).map(c => ({ text: c.CategoryName, value: c.CategoryID, descripiton: c.Description }));
    return distinct(categories, 'value').sort((a, b) => a.value - b.value);
  }

  pageChange(pageChange: PageChangeEvent) {
    this.state = { ...this.state, ...pageChange };
    this.loadData();
  }

  filterChange(filter: CompositeFilterDescriptor): void {
    this.state = { ...this.state, filter: filter };
    this.loadData();
  }

  onCheckedStateChange(checkboxFilter: CheckBoxComponent, field: string): void {
    let checkedState = checkboxFilter.checkedState;
    const prevFilter = this.findFilter(this.state.filter, field)?.value as boolean | undefined;
    let filters = this.removeFilter(this.state.filter, field);
    if (checkedState === true && prevFilter === false)
      checkboxFilter.checkedState = 'indeterminate';
    else {
      if (checkedState === false && prevFilter === undefined) {
        checkedState = true;
        checkboxFilter.checkedState = checkedState;
      }

      filters = [...filters, { field: field, operator: 'eq', value: checkedState }];
    }
    this.filterChange({ logic: 'and', filters });
  }

  private removeFilter = (filter?: CompositeFilterDescriptor, field?: string): FilterDescriptor[] =>
    (filter?.filters as FilterDescriptor[]).filter(f => f.field !== field);

  private findFilter = (filter?: CompositeFilterDescriptor, field?: string) : FilterDescriptor | undefined =>
    (filter?.filters as FilterDescriptor[]).find(f => f.field === field);

  private loadData(): void {
    this.gridData = process(sampleProducts, this.state);
  }
}
