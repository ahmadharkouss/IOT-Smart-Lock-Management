import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Log , LogsResponse, DeleteLogsResponse } from '../interfaces/responses/logs.response.interface';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LogsService {

  apiUrl = environment.api + 'logs/';

  constructor(private http: HttpClient) { }

  getLogs(): Observable<Log[]> { 
    return this.http.get<LogsResponse>(this.apiUrl + 'all').pipe(
      map(response => {
         return response.data;
      }),
       tap(logs => console.log('Fetched logs:', logs)),
    );
  }

  deletAllLogs(): Observable<boolean> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<DeleteLogsResponse>(this.apiUrl + 'delete', '', { headers }).pipe(
      map(response => response.data),
      tap(success => console.log('Deleted all logs:', success))
    );
  }

}
