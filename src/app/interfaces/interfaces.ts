import { FormControl } from "@angular/forms";

export interface ICondition {
    id: number,
    code: string,
    name: string,
}

export interface IConditionForm {
    condition: FormControl<ICondition | null>,
    notes: FormControl<string | null>
}
