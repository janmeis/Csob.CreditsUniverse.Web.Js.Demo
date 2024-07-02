import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridDateFilterComponent } from './components/grid-date-filter/grid-date-filter.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { SharedModule } from './shared.module';

import '@progress/kendo-angular-intl/locales/cs/all';
import { GridDropdownFilterComponent } from './components/grid-dropdown-filter/grid-dropdown-filter.component';
import { DatePickerComponent } from './components/grid-date-filter/components/date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    GridDateFilterComponent,
    LocalDatePipe,
    GridDropdownFilterComponent,
    DatePickerComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "cs-CZ" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
