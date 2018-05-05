import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// helpers
import { apiHeaders, apiUrl } from '../config';

// rxjs
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
@Injectable()

export class CrmService {

constructor( private http: HttpClient) {
}

getLeadsList (limit: number = 50, offset: number = 0): Observable<any> {
  const url = `${apiUrl}crm/leads/?limit=${limit}&offset=${offset}`;
  // const url = `${apiUrl}crm/leads/`;
  console.log('id_token', apiHeaders());
  return this.http.get(url);
}

CreateLead (body): Observable<any> {
  const url = `${apiUrl}crm/leads/`;
  console.log('body: ', body);
  return this.http.post<any>(url, body)
    .pipe(tap(data => {
      console.log('return post data: ', data);
    }));
}

}

// @Injectable()
// export class CrmService {
//     private url = 'http://ec2-35-183-72-80.ca-central-1.compute.amazonaws.com:8080/api/v1/crm/leads?limit=50&offset=0';
//     constructor(private _http: HttpClient) { }
//     getLeadsList(): Observable<any> {
//         return this._http.get<any>(this.url)
//             .do(data => console.log('111111', JSON.stringify(data)))
//             .catch(this.handleError);
//     }
//     private handleError(err: HttpErrorResponse) {
//         console.log('22222', err.message);
//         return Observable.throw(err.message);
//     }
// }
