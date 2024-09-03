import { Pipe, PipeTransform } from '@angular/core';
import { IntlService } from '@progress/kendo-angular-intl';

@Pipe({
  name: 'localDate',
  standalone: true
})
export class LocalDatePipe implements PipeTransform {
  constructor(private intl: IntlService) { }

  transform(date: Date | null, format?: string): string {
    if (!date || !format || format.length === 0)
      return '';

    return this.intl.formatDate(date, format);
  }
}
