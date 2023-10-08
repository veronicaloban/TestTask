import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OutputGenerationService {
    private _outputObject$ = new BehaviorSubject({});
    public outputObject$ = this._outputObject$.asObservable();
    
    public formOutputObject(date: {day: number, month: number, year: number}, conditions: Partial<{ condition: string, notes: string }>[]) {
      const formattedDate = this.formatDate(date);
      const obj: { encounter: object, conditions?: object} =  {
          encounter: {
            date: formattedDate
          },
        };
      const conditionsArray = conditions.filter(condition => condition.condition).map( condition => this.formConditionObject(condition));

      if (conditionsArray.length > 0) {
        obj.conditions = conditionsArray;
      }
      
      this._outputObject$.next(obj);
      }

      private formConditionObject(condition: Partial<{ condition: string, notes: string }>) {
        console.log(condition)
        const value = condition.condition?.split(' ')[1];
        const code = condition.condition?.split(' ')[0];
        const { notes } = condition;
      
        return {
          id: 'id',
          context: {
            identifier: {
              type: {
                coding: [
                  {
                    system: "eHealth/resources",
                    code: "encounter"
                  }
                ]
              },
              value
            }
          },
          code: {
            coding: [
              {
                system: "eHealth/ICPC2/condition_codes",
                code
              }
            ],
          },
          notes,
          onset_date: ``    
        };
      }

      private formatDate(dateToFormat: {day: number, month: number, year: number}) {
        const { year, month, day } = dateToFormat;

        const date = new Date(year, month - 1, day);

        return date.toISOString();
      }
}