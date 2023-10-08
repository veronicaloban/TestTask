import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
      const dateParts = value.trim().split('-');

      console.log(dateParts)
      
    //   if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
    //     return {day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: null};
    //   } else (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return {day: Number(dateParts[0]), month: Number(dateParts[1]), year: Number(dateParts[2])};
      //}
  }

  format(date: NgbDateStruct): string {
    return date ?
        `${date.day ? date.day : ''}.${date.month ? date.month : ''}.${date.year}` :
        '';
  }
}