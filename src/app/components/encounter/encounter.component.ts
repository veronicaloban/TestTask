import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { ICondition, IConditionForm } from "../../interfaces/interfaces";
import { OutputGenerationService } from "../../services/outputGeneration.service";
import { validateDate } from "../../utils/customValidators.utils";

@Component({
    selector: 'encounter',
    templateUrl: './encounter.component.html',
    styleUrls: ['./encounter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EncounterComponent {
    public outputObject$ = this.outputGenerationService.outputObject$;

    public encounterForm = new FormGroup({
      date: new FormControl<NgbDateStruct | null >(null, validateDate()),
      conditions: new FormArray([this.createConditionForm(), this.createConditionForm()])
    });
  
    constructor(private outputGenerationService: OutputGenerationService) {}

    public getConditionsForms(): FormGroup<IConditionForm>[] {
      return this.encounterForm.controls['conditions']['controls'];
    }
  
    public addConditionForm(): void {
      this.encounterForm.controls['conditions'].push(this.createConditionForm());
    }
  
    public createConditionForm(): FormGroup<IConditionForm>  {
      return new FormGroup({
        condition: new FormControl<ICondition|null>(null),
        notes: new FormControl<string|null>(null),
      });
    }
  
    public formOutputObject(): void {
      const { date, conditions } = this.encounterForm.value;

      this.outputGenerationService.formOutputObject(date, conditions);
    }
}
