import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs';

import { ICondition } from '../interfces/condition.interface';

@Injectable({
    providedIn: 'root'
})
export class ConditionsService {
    constructor(private http: HttpClient) {}

    getAllConditions(): Observable<ICondition[]> {
        return this.http.get<ICondition[]>('/Dictionaries/icpc2?IsPublic=true');
    }
}