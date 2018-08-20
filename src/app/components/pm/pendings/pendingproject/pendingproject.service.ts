import { Injectable, Output, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { environment } from '../../../../../environments/environment';
import { apiHeaders} from '../../../../config';

@Injectable()

export class PendingProjectService {
    /*
    options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };

    constructor( private http: HttpClient) {
    }

    getProductsList (projectId: string, limit: number = 50, offset: number = 0): Observable<any> {
        const url = `${environment.apiUrl}/project-management/projects/${projectId}/products/?limit=${limit}&offset=${offset}`;
        return this.http.get(url);
    }
    */
}
