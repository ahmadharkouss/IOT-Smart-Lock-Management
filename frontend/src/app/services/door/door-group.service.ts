import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DoorGroupResponse, DoorGroup, DoorGroupIdsReponse } from '../../interfaces/responses/doorGroup.response.interface';
import { DoorGroupRequest, DoorGroupPatchRequest } from '../../interfaces/requests/doorGroup.request.interface';
@Injectable({
  providedIn: 'root'
})
export class DoorGroupService {

  apiUrl = environment.api + 'admin/doorgroup/';

  constructor(private http: HttpClient) { }

  getDoorGroups(): Observable<DoorGroup[]> {
    return this.http.get<DoorGroupResponse>(this.apiUrl + 'all').pipe(
      map(response => {
        const data = response.data;
        return Array.isArray(data) ? data : [data];
      }),
       tap(DoorGroups => console.log('Fetched DoorGroups:', DoorGroups)),
    );
  }
  getDoorGroupIds(): Observable<number[]> {
    return this.http.get<DoorGroupIdsReponse>(this.apiUrl + 'allids').pipe(
      map(response => {
         return response.data;
      }),
       tap(DoorGroupIds => console.log('Fetched DoorGroupIds:', DoorGroupIds)),
    );

  }

  getDoorGroupByID(id: number): Observable<DoorGroup> {
    return this.http.get<DoorGroupResponse>(this.apiUrl + id).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single DoorGroup object but received array');
        }
        return data;
      })
    );
  }

  createDoorGroup(DoorGroup: DoorGroupRequest): Observable<DoorGroup> {
    return this.http.post<DoorGroupResponse>(this.apiUrl, DoorGroup).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single DoorGroup object but received array');
        }
        return data;
      } )
    );
  }

  //Patch request to update DoorGroup 
  updateDoorGroup(DoorGroup: DoorGroupPatchRequest): Observable<DoorGroup> {
    return this.http.patch<DoorGroupResponse>(this.apiUrl, DoorGroup).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single DoorGroup object but received array');
        }
        return data;
      } )
    );
  }


  deleteDoorGroupByID(id: number): Observable<DoorGroup> {
    return this.http.delete<DoorGroupResponse>(this.apiUrl + id).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single DoorGroup object but received array');
        }
        return data;
      })
    );
  }
}
