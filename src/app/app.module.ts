import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridDateFilterComponent } from './components/grid-date-filter/grid-date-filter.component';
import { GridDropdownFilterComponent } from './components/grid-dropdown-filter/grid-dropdown-filter.component';
import { initializeLocale } from './locale-init';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { SharedModule } from './shared.module';

initializeLocale();
@NgModule({
  declarations: [
    AppComponent,
    GridDateFilterComponent,
    GridDropdownFilterComponent,
  ],
  imports: [
    LocalDatePipe,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'cs-CZ' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
