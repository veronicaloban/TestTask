import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs';

import { ICondition } from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ConditionsService {
    constructor(private http: HttpClient) {}

    public getConditions(searchSrting: string = ''): Observable<ICondition[]> {
        return this.http.get<ICondition[]>(`/Dictionaries/icpc2?IsPublic=true&Search=${searchSrting}`);
    }
}