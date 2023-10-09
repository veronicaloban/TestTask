import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { formatDate } from "./functions.utils";

export function validateDate(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
  
      const dateFromControl = control.value;
      const currentDateWithoutTime = new Date().setHours(0, 0, 0, 0);
  
      if (!dateFromControl) {
        return null;
      }

      const formattedDateFromControl = new Date(formatDate(dateFromControl)).getTime();

      return formattedDateFromControl >= currentDateWithoutTime ? null : { dateIsEarlier: true };
    }
  }
