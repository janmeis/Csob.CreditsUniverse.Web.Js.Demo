import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { Locale, localeData } from '@progress/kendo-angular-intl';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePickerComponent } from './components/grid-date-filter/components/date-picker/date-picker.component';
import { GridDateFilterComponent } from './components/grid-date-filter/grid-date-filter.component';
import { GridDropdownFilterComponent } from './components/grid-dropdown-filter/grid-dropdown-filter.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { SharedModule } from './shared.module';

import '@progress/kendo-angular-intl/locales/cs/all';

const csData: Locale = localeData('cs');
csData.calendar!.months!.format!.wide = [
  'Leden',
  'Únor',
  'Březen',
  'Duben',
  'Květen',
  'Červen',
  'Červenec',
  'Srpen',
  'Září',
  'Říjen',
  'Listopad',
  'Prosinec'
];
csData.calendar!.months!.format!.abbreviated = [
  'Led',
  'Úno',
  'Bře',
  'Dub',
  'Kvě',
  'Čen',
  'Čec',
  'Srp',
  'Zář',
  'Říj',
  'Lis',
  'Pro'
];

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
  providers: [
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'cs-CZ' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
