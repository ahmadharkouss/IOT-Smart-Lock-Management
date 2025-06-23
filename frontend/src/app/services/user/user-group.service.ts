import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserGroupResponse, UserGroup, UserGroupIdsReponse } from '../../interfaces/responses/userGroup.response.interface';
import { UserGroupRequest, UserGroupPatchRequest } from '../../interfaces/requests/userGroup.request.interface';
@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  apiUrl = environment.api + 'admin/usergroup/';

  constructor(private http: HttpClient) { }

  getUserGroups(): Observable<UserGroup[]> {
    return this.http.get<UserGroupResponse>(this.apiUrl + 'all').pipe(
      map(response => {
        const data = response.data;
        return Array.isArray(data) ? data : [data];
      }),
       tap(UserGroups => console.log('Fetched UserGroups:', UserGroups)),
    );
  }

  getUserGroupIds(): Observable<number[]> {
    return this.http.get<UserGroupIdsReponse>(this.apiUrl + 'allid').pipe(
      map(response => {
         return response.data;
      }),
       tap(UserGroupIds => console.log('Fetched UserGroupIds:', UserGroupIds)),
    );

  }

  getUserGroupByID(id: number): Observable<UserGroup> {
    return this.http.get<UserGroupResponse>(this.apiUrl + id).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single UserGroup object but received array');
        }
        return data;
      })
    );
  }

  createUserGroup(UserGroup: UserGroupRequest): Observable<UserGroup> {
    return this.http.post<UserGroupResponse>(this.apiUrl, UserGroup).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single UserGroup object but received array');
        }
        return data;
      } )
    );
  }

  //Patch request to update UserGroup 
  updateUserGroup(UserGroup: UserGroupPatchRequest): Observable<UserGroup> {
    return this.http.patch<UserGroupResponse>(this.apiUrl, UserGroup).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single UserGroup object but received array');
        }
        return data;
      } )
    );
  }

  deleteUserGroupByID(id: number): Observable<UserGroup> {
    return this.http.delete<UserGroupResponse>(this.apiUrl + id).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single UserGroup object but received array');
        }
        return data;
      })
    );
  }
}
