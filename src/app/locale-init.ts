import { Locale, localeData } from '@progress/kendo-angular-intl';
import '@progress/kendo-angular-intl/locales/cs/all';

export const initializeLocale = () => {
  const csData: Locale = localeData('cs');
  csData.calendar!.months!.format!.wide = [
    'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
    'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
  ];
  csData.calendar!.months!.format!.abbreviated = [
    'Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čen',
    'Čec', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'
  ];
}
