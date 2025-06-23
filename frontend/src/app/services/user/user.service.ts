import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { UserRespsonse, User } from '../../interfaces/responses/user.response.interface';
import { UserRequest,  UserPatchRequest } from '../../interfaces/requests/user.request.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrl = environment.api + 'admin/user/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<UserRespsonse>(this.apiUrl + 'all').pipe(
      map(response => {
        const data = response.data;
        return Array.isArray(data) ? data : [data];
      }),
       tap(users => console.log('Fetched users:', users)),
    );
  }

  getUserByID(id: number): Observable<User> {
    return this.http.get<UserRespsonse>(this.apiUrl + id).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single user object but received array');
        }
        return data;
      })
    );
  }

  createUser(user: UserRequest): Observable<User> {
    return this.http.post<UserRespsonse>(this.apiUrl, user).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single user object but received array');
        }
        return data;
      } )
    );
  }

  //Patch request to update user 
  updateUser(user: UserPatchRequest): Observable<User> {
    return this.http.patch<UserRespsonse>(this.apiUrl, user).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single user object but received array');
        }
        return data;
      } )
    );
  }

  deleteUserByID(id: number): Observable<User> {
    return this.http.delete<UserRespsonse>(this.apiUrl + id).pipe(
      map(response => {
        const data = response.data;
        if (Array.isArray(data)) {
          throw new Error('Expected single user object but received array');
        }
        return data;
      })
    );
  }
}
