import { NativeDateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable({
  // we declare that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      console.log('h');
      return `${day}/${month}/${year}`;
    }
    console.log('format', date.toDateString());
    return date.toDateString();
  }

  parse(value: any): Date | null {
    console.log('before moment', value);
    const date = moment(value, 'DD/MM/YYYY');
    console.log('after moment', date);
    return date.isValid() ? date.toDate() : null;
  }
}
