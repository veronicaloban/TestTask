import { AfterViewInit, Component, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable, debounceTime, distinctUntilChanged, fromEvent, map, merge, switchMap, tap } from 'rxjs';

import { ICondition } from '../../interfaces/interfaces';
import { ConditionsService } from '../../services/conditions.service';
import { changeClass } from '../../utils/functions.utils';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    providers: [{ 
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => AutocompleteComponent),
        multi: true
    }]
})
export class AutocompleteComponent implements ControlValueAccessor, AfterViewInit {
    @ViewChild('searchInput', { static: true }) input!: ElementRef;
    @ViewChild('inputButton', { static: true }) inputButton!: ElementRef;

    public suggestions$!: Observable<any>;
    public selectedValue: ICondition | undefined;
    public shouldHideOptions: boolean = true;

    private onChange: (value: ICondition | undefined) => void = () => {};
    public onTouched: () => void = () => {};

    public get inputShowValue(): string {
      return this.selectedValue ? this.selectedValue.code + ' ' + this.selectedValue?.name : ''
    }

    constructor(private service: ConditionsService) {}

    public ngAfterViewInit(): void {
      this.suggestions$ = merge(
          fromEvent(this.input.nativeElement, 'keyup'),
          fromEvent(this.input.nativeElement, 'mouseup'),
          fromEvent(this.inputButton.nativeElement, 'click')
        ).pipe(
            map(() => this.input.nativeElement.value),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(search => this.loadSuggestions(search)),
            tap(() => {
              changeClass(this.inputButton.nativeElement, 'bi-caret-down-fill', 'bi-caret-up-fill');
              this.shouldHideOptions = false;
            }),
        )
    }

    public writeValue(value: ICondition | undefined): void {
      this.selectedValue = value;
    }
  
    public registerOnChange(fn: (value: ICondition | undefined) => void): void {
      this.onChange = fn;
    }
  
    public registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }
  
    public onInputChange(): void {
      this.onChange(this.selectedValue);
    }
  
    public selectSuggestion(suggestion: ICondition): void {
      this.selectedValue = suggestion;
      this.shouldHideOptions = true;
      changeClass(this.inputButton.nativeElement, 'bi-caret-up-fill', 'bi-caret-down-fill');
      this.onTouched();
      this.onChange(this.selectedValue);
    }
    
    private loadSuggestions(search: string): Observable<ICondition[]> {
      return this.service.getConditions(search);
    }
  }
