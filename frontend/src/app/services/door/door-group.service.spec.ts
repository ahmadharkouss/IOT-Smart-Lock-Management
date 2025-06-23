import { TestBed } from '@angular/core/testing';

import { DoorGroupService } from './door-group.service';


import {  HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { DoorGroup, DoorGroupResponse } from '../../interfaces/responses/doorGroup.response.interface';
import { DoorGroupRequest,  DoorGroupPatchRequest } from '../../interfaces/requests/doorGroup.request.interface';


describe('DoorGroupService', () => {
  let service: DoorGroupService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.api + 'admin/doorgroup/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoorGroupService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DoorGroupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getDoorGroups', () => {
    it('should return an Observable<DoorGroup[]>', () => {
      const dummyDoorGroups: DoorGroup[] = [
        { id: 1, zone_name: 'Zone1', doors: [1, 2], createdAt: new Date() },
        { id: 2, zone_name: 'Zone2', doors: [3, 4], createdAt: new Date() }
      ];

      const response: DoorGroupResponse = {
        code: 200,
        description: '',
        data: dummyDoorGroups
      };

      service.getDoorGroups().subscribe(doorGroups => {
        expect(doorGroups.length).toBe(2);
        expect(doorGroups).toEqual(dummyDoorGroups);
      });

      const req = httpMock.expectOne(apiUrl + 'all');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });

  describe('#getDoorGroupByID', () => {
    it('should return an Observable<DoorGroup>', () => {
      const dummyDoorGroup: DoorGroup = { id: 1, zone_name: 'Zone1', doors: [1, 2], createdAt: new Date() };

      const response: DoorGroupResponse = {
        code: 200,
        description: '',
        data: dummyDoorGroup
      };

      service.getDoorGroupByID(1).subscribe(doorGroup => {
        expect(doorGroup).toEqual(dummyDoorGroup);
      });

      const req = httpMock.expectOne(apiUrl + '1');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });

  describe('#createDoorGroup', () => {
    it('should create a new door group and return it', () => {
      const newDoorGroup: DoorGroupRequest = { name: 'Zone1' };
      const createdDoorGroup: DoorGroup = { id: 1, zone_name: 'Zone1', doors: [], createdAt: new Date() };

      const response: DoorGroupResponse = {
        code: 200,
        description: '',
        data: createdDoorGroup
      };

      service.createDoorGroup(newDoorGroup).subscribe(doorGroup => {
        expect(doorGroup).toEqual(createdDoorGroup);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });
  });

  describe('#updateDoorGroup', () => {
    it('should update an existing door group and return it', () => {
      const updatedDoorGroup: DoorGroupPatchRequest = { id: 1, name: 'Zone1 Updated', isadmin: false, email: 'zone1@example.com' };
      const returnedDoorGroup: DoorGroup = { id: 1, zone_name: 'Zone1 Updated', doors: [], createdAt: new Date() };

      const response: DoorGroupResponse = {
        code: 200,
        description: '',
        data: returnedDoorGroup
      };

      service.updateDoorGroup(updatedDoorGroup).subscribe(doorGroup => {
        expect(doorGroup).toEqual(returnedDoorGroup);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('PATCH');
      req.flush(response);
    });
  });


  
  describe('#deleteDoorGroupByID', () => {
    it('should delete a door group by ID and return the deleted door group', () => {
      const deletedDoorGroup: DoorGroup = { id: 1, zone_name: 'Zone1', doors: [1, 2], createdAt: new Date() };

      const response: DoorGroupResponse = {
        code: 200,
        description: '',
        data: deletedDoorGroup
      };

      service.deleteDoorGroupByID(1).subscribe(doorGroup => {
        expect(doorGroup).toEqual(deletedDoorGroup);
      });

      const req = httpMock.expectOne(apiUrl + '1');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });






});
