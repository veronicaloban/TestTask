import { Injectable } from "@angular/core";

import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { BehaviorSubject } from "rxjs";

import { ICondition } from "../interfaces/interfaces";
import { formatDate } from "../utils/functions.utils";

@Injectable({
    providedIn: 'root'
})
export class OutputGenerationService {
    private _outputObject$ = new BehaviorSubject({});
    public outputObject$ = this._outputObject$.asObservable();
    
    public formOutputObject(date?: NgbDateStruct | null, conditions?: Partial<{ condition: ICondition | null, notes: string | null }>[]) {
      const formattedDate = date ? formatDate(date) : null;
      const resultObj: { encounter: object, conditions?: object} =  {
          encounter: {
            date: formattedDate
          },
        };
      const conditionsArray = conditions?.filter(condition => condition.condition).map( condition => this.formConditionObject(condition, formattedDate));

      if (!!conditionsArray?.length) {
        resultObj.conditions = conditionsArray;
      }
      
      this._outputObject$.next(resultObj);
      }

      private formConditionObject(condition: Partial<{ condition: ICondition | null, notes: string | null }>, onsetDate: string | null) {
        const { notes } = condition;
      
        return {
          id: crypto.randomUUID(),
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
              value: condition.condition?.id
            }
          },
          code: {
            coding: [
              {
                system: "eHealth/ICPC2/condition_codes",
                code: condition.condition?.code
              }
            ],
          },
          notes,
          onset_date: onsetDate   
        };
      }
}
