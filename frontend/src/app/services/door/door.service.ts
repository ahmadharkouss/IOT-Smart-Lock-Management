import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { DoorResponse, Door } from '../../interfaces/responses/door.response.interface';
import { DoorRequest,  DoorPatchRequest } from '../../interfaces/requests/door.request.interface';


@Injectable({
  providedIn: 'root'
})
export class DoorService {
  
  apiUrl = environment.api + 'admin/door/';

  constructor(private http: HttpClient) { }

  getDoors(): Observable<Door[]> {
    return this.http.get<DoorResponse>(this.apiUrl + 'all').pipe(
      map(response => {
        const data = response.data;
        return Array.isArray(data) ? data : [data];
      }),
       tap(Doors => console.log('Fetched Doors:', Doors)),
    );
  }

  getDoorByID(id: number): Observable<Door> {
    return this.http.get<DoorResponse>(this.apiUrl + id).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single Door object but received array');
        }
        return data;
      })
    );
  }

  createDoor(Door: DoorRequest): Observable<Door> {
    return this.http.post<DoorResponse>(this.apiUrl, Door).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single Door object but received array');
        }
        return data;
      } )
    );
  }

  //Patch request to update Door 
  updateDoor(Door: DoorPatchRequest): Observable<Door> {
    return this.http.patch<DoorResponse>(this.apiUrl, Door).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single Door object but received array');
        }
        return data;
      } )
    );
  }

  deleteDoorByID(id: number): Observable<Door> {
    return this.http.delete<DoorResponse>(this.apiUrl + id).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single Door object but received array');
        }
        return data;
      })
    );
  }
}
