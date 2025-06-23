import { TestBed } from '@angular/core/testing';
import {  HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserGroupService } from './user-group.service';
import { UserGroup, UserGroupResponse } from '../../interfaces/responses/userGroup.response.interface';
import { UserGroupRequest, UserGroupPatchRequest } from '../../interfaces/requests/userGroup.request.interface';
import { environment } from '../../../environments/environment';

describe('UserGroupService', () => {
  let service: UserGroupService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.api + 'admin/usergroup/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGroupService,  provideHttpClient(),
        provideHttpClientTesting(),]
    });
    service = TestBed.inject(UserGroupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUserGroups', () => {
    it('should return an Observable<UserGroup[]>', () => {
      const dummyUserGroups: UserGroup[] = [
        { id: 1, name: 'Group1', users: [1, 2], door_groups: [1], CreatedAt: new Date() },
        { id: 2, name: 'Group2', users: [3, 4], door_groups: [2], CreatedAt: new Date() }
      ];

      const response: UserGroupResponse = {
        code: 200,
        description: '',
        data: dummyUserGroups
      };

      service.getUserGroups().subscribe(userGroups => {
        expect(userGroups.length).toBe(2);
        expect(userGroups).toEqual(dummyUserGroups);
      });

      const req = httpMock.expectOne(apiUrl + 'all');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });

  describe('#getUserGroupByID', () => {
    it('should return an Observable<UserGroup>', () => {
      const dummyUserGroup: UserGroup = { id: 1, name: 'Group1', users: [1, 2], door_groups: [1], CreatedAt: new Date() };

      const response: UserGroupResponse = {
        code: 200,
        description: '',
        data: dummyUserGroup
      };

      service.getUserGroupByID(1).subscribe(userGroup => {
        expect(userGroup).toEqual(dummyUserGroup);
      });

      const req = httpMock.expectOne(apiUrl + '1');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });

  describe('#createUserGroup', () => {
    it('should create a new user group and return it', () => {
      const newUserGroup: UserGroupRequest = { name: 'Group1' };
      const createdUserGroup: UserGroup = { id: 1, name: 'Group1', users: [], door_groups: [], CreatedAt: new Date() };

      const response: UserGroupResponse = {
        code: 200,
        description: '',
        data: createdUserGroup
      };

      service.createUserGroup(newUserGroup).subscribe(userGroup => {
        expect(userGroup).toEqual(createdUserGroup);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });
  });

  describe('#updateUserGroup', () => {
    it('should update an existing user group and return it', () => {
      const updatedUserGroup: UserGroupPatchRequest = { id: 1, name: 'Group1 Updated', isadmin: false, email: 'group1@example.com' };
      const returnedUserGroup: UserGroup = { id: 1, name: 'Group1 Updated', users: [], door_groups: [], CreatedAt: new Date() };

      const response: UserGroupResponse = {
        code: 200,
        description: '',
        data: returnedUserGroup
      };

      service.updateUserGroup(updatedUserGroup).subscribe(userGroup => {
        expect(userGroup).toEqual(returnedUserGroup);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('PATCH');
      req.flush(response);
    });
  });

  describe('#deleteUserGroupByID', () => {
    it('should delete a user group by ID and return the deleted user group', () => {
      const deletedUserGroup: UserGroup = { id: 1, name: 'Group1', users: [1, 2], door_groups: [1], CreatedAt: new Date() };

      const response: UserGroupResponse = {
        code: 200,
        description: '',
        data: deletedUserGroup
      };

      service.deleteUserGroupByID(1).subscribe(userGroup => {
        expect(userGroup).toEqual(deletedUserGroup);
      });

      const req = httpMock.expectOne(apiUrl + '1');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });
});
