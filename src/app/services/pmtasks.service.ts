import { Injectable, Output, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { apiUrl } from '../config';


import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()

export class PmTasksService {

  constructor( private http: HttpClient ) {

  }

  getTaskGroups (): Observable<any> {
    const url = `${environment.apiUrl}/project-management/task-groups`;
    return this.http.get(url);
  }

  getTaskGroupsWithParams (params): Observable<any> {
    const url = `${environment.apiUrl}/project-management/task-groups`;
    return this.http.get(url, {params: params});
  }

  createTaskGroup (body): Observable<any> {
    const url = `${environment.apiUrl}/project-management/task-groups`;
    return this.http.post<any>(url, body);
  }

  updateIndividualTaskGroup (id, body): Observable<any> {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}`;
    return this.http.put<any>(url, body);
  }

  getIndividualTaskGroup(id): Observable<any>  {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}`;
    return this.http.get(url);
  }

  deleteIndividualTaskGroup(id): Observable<any> {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}`;
    return this.http.delete(url);
  }

  getTasks(id): Observable<any>  {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}/tasks`;
    return this.http.get(url);
  }

  createTask (id, body): Observable<any> {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}/tasks`;
    return this.http.post<any>(url, body);
  }

  updateIndividualTask (id, taskId, body): Observable<any> {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}/tasks/${taskId}`;
    return this.http.put<any>(url, body);
  }

  getIndividualTask(id, taskId): Observable<any>  {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}/tasks/${taskId}`;
    return this.http.get(url);
  }

  deleteIndividualtask(id, taskId): Observable<any> {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}/tasks/${taskId}`;
    return this.http.delete(url);
  }

  getSubTasks(id, taskId): Observable<any>  {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}/tasks/${taskId}/subtasks`;
    return this.http.get(url);
  }

  createSubTask (id, taskId, body): Observable<any> {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}/tasks/${taskId}/subtasks`;
    return this.http.post<any>(url, body);
  }

  updateIndividualSubTask (id, taskId, subId, body): Observable<any> {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}/tasks/${taskId}/subtasks/${subId}`;
    return this.http.put<any>(url, body);
  }

  getIndividualSubTask(id, taskId, subId): Observable<any>  {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}/tasks/${taskId}/subtasks/${subId}`;
    return this.http.get(url);
  }

  deleteIndividualSubTask(id, taskId, subId): Observable<any> {
    const url = `${environment.apiUrl}/project-management/task-groups/${id}/tasks/${taskId}/subtasks/${subId}`;
    return this.http.delete(url);
  }

}
