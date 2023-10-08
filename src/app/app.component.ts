import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { shareReplay } from 'rxjs/operators';

import { ConditionsService } from './services/conditions.service';
import { OutputGenerationService } from './services/outputGeneration.service';
import { checkDate } from './utils/customValidators.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public outputObject$ = this.outputGenerationService.outputObject$;
  public conditions$ = this.conditionsService.getAllConditions().pipe(shareReplay());

  public encounterForm = this.fb.group({
    date: [null, checkDate()],
    conditions: this.fb.array([
      this.createConditionForm(),
      this.createConditionForm()
    ])
  })

  constructor(private fb: FormBuilder, private conditionsService: ConditionsService, private outputGenerationService: OutputGenerationService) {
    console.log(Date.now(), 'DAYE NOW')
  }

  public getFormsConditions(): FormGroup<{ condition: FormControl<string>; notes: FormControl<string> }>[] {
    return this.encounterForm.controls['conditions']['controls'];
  }

  public addCondition(): void {
    this.encounterForm.controls['conditions'].push(this.createConditionForm());
  }

  public createConditionForm(): FormGroup<{ condition: FormControl<string>; notes: FormControl<string> }>  {
    return this.fb.nonNullable.group({
      condition: [''],
      notes: ['']
    })
  }

  public formOutputObject(): void {
    const { date, conditions } = this.encounterForm.value;

    if(date && conditions) {
      this.outputGenerationService.formOutputObject(date, conditions);
    }
  }
}
