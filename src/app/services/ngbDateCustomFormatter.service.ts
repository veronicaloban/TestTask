import { Injectable } from '@angular/core';

import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
      const dateParts = value.trim().split('-');

      return {day: Number(dateParts[0]), month: Number(dateParts[1]), year: Number(dateParts[2])};
  }

  format(date: NgbDateStruct): string {
    return date ?
        `${date.day ? date.day : ''}.${date.month ? date.month : ''}.${date.year}` :
        '';
  }
}