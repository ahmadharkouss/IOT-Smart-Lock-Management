import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { TransactionResponse } from "../../interfaces/responses/transaction.response.interface";
import { UserGroupUserRequest } from "../../interfaces/requests/transactions/userGroupUser.request.interface";
import { DoorGroupDoorRequest } from "../../interfaces/requests/transactions/doorGroupDoor.request.interface";
import { UserGroupDoorGroupRequest } from "../../interfaces/requests/transactions/userGroup-doorGroup.request.interface";
import { UserGroupResponse } from "../../interfaces/responses/userGroup.response.interface";
import { UserGroup } from "../../interfaces/responses/userGroup.response.interface";
@Injectable({
  providedIn: "root",
})
export class GroupTransactionService {
  apiUrl = environment.api + "admin/";
  constructor(private http: HttpClient) {}

  //user --> group of users

  addUserToGroup(userGroupUser: UserGroupUserRequest): Observable<Boolean> {
    return this.http
      .post<TransactionResponse>(this.apiUrl + "usergroupuser", userGroupUser)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  deleteUserToGroup(userGroupUser: UserGroupUserRequest): Observable<Boolean> {
    return this.http
      .delete<TransactionResponse>(this.apiUrl + "usergroupuser", { body: userGroupUser })
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  //door --> group of doors

  addDoorToGroup(doorGroupDoor: DoorGroupDoorRequest): Observable<Boolean> {
    return this.http
      .post<TransactionResponse>(this.apiUrl + "doorgroupdoor", doorGroupDoor)
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  deleteDoorToGroup(doorGroupDoor: DoorGroupDoorRequest): Observable<Boolean> {
    return this.http
      .delete<TransactionResponse>(this.apiUrl + "doorgroupdoor", { body: doorGroupDoor })
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  //user group --> door group

  addUserGroupToDoorGroup(
    userGroupDoorGroup: UserGroupDoorGroupRequest
  ): Observable<Boolean> {
    return this.http
      .post<TransactionResponse>(
        this.apiUrl + "usergroupdoorgroup",
        userGroupDoorGroup
      )
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }


  deleteUserGroupToDoorGroup(
    userGroupDoorGroup: UserGroupDoorGroupRequest
  ): Observable<Boolean> {
    return this.http
      .delete<TransactionResponse>(this.apiUrl + "usergroupdoorgroup", {
        body: userGroupDoorGroup,
      })
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }
  getUserGroupsofDoorGroup(doorGroupID: number): Observable<UserGroup[]> {
    return this.http
      .get<UserGroupResponse>(this.apiUrl + "usergroupdoorgroup/" + doorGroupID)
      .pipe(
        map((response) => {
          const data = response.data;
          return Array.isArray(data) ? data : [data];
        }),
        tap((userGroups) =>
          console.log("Fetched userGroups of doorGroup:", userGroups)
        )
      );
  }

}
