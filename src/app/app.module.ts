import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridDateFilterComponent } from './grid-date-filter/grid-date-filter.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { SharedModule } from './shared.module';

import '@progress/kendo-angular-intl/locales/cs/all';

@NgModule({
  declarations: [
    AppComponent,
    GridDateFilterComponent,
    LocalDatePipe
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "cs-CZ" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
