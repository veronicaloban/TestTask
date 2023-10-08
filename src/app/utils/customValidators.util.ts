import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkDate(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
  
      const dateFromControl = control.value;
      const currentDate = Date.now();
  
      if (!dateFromControl) { //if we haven't typed anything yet, then we should not see any errors
        return null;
      }

      const formattedDateFromControl = new Date(formatDate(dateFromControl)).getTime();

      console.log(formattedDateFromControl, currentDate, 'IN FORM!!!')


      return formattedDateFromControl >= currentDate ? null : { dateIsEarlier: true };
    }
  }

  function formatDate(dateToFormat: {day: number, month: number, year: number}) {
    const { year, month, day } = dateToFormat;

    const date = new Date(year, month - 1, day);

    return date.toISOString();
  }