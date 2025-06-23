import { TestBed } from '@angular/core/testing';

import { DoorService } from './door.service';

import {  HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


import { Door, DoorResponse } from '../../interfaces/responses/door.response.interface';
import { DoorRequest,  DoorPatchRequest } from '../../interfaces/requests/door.request.interface';

describe('DoorService', () => {
  let service: DoorService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.api + 'admin/door/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoorService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DoorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('#getDoors', () => {
    it('should return an Observable<Door[]>', () => {
      const dummyDoors: Door[] = [
        { id: 1, name: 'Door1', door_groups: [1], created_at: new Date() },
        { id: 2, name: 'Door2', door_groups: [2], created_at: new Date() }
      ];

      const response: DoorResponse = {
        code: 200,
        description: '',
        data: dummyDoors
      };

      service.getDoors().subscribe(doors => {
        expect(doors.length).toBe(2);
        expect(doors).toEqual(dummyDoors);
      });

      const req = httpMock.expectOne(apiUrl + 'all');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });

  describe('#getDoorByID', () => {
    it('should return an Observable<Door>', () => {
      const dummyDoor: Door = { id: 1, name: 'Door1', door_groups: [1], created_at: new Date() };

      const response: DoorResponse = {
        code: 200,
        description: '',
        data: dummyDoor
      };

      service.getDoorByID(1).subscribe(door => {
        expect(door).toEqual(dummyDoor);
      });

      const req = httpMock.expectOne(apiUrl + '1');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });

  describe('#createDoor', () => {
    it('should create a new door and return it', () => {
      const newDoor: DoorRequest = { name: 'Door1' };
      const createdDoor: Door = { id: 1, name: 'Door1', door_groups: [], created_at: new Date() };

      const response: DoorResponse = {
        code: 200,
        description: '',
        data: createdDoor
      };

      service.createDoor(newDoor).subscribe(door => {
        expect(door).toEqual(createdDoor);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });
  });

  describe('#updateDoor', () => {
    it('should update an existing door and return it', () => {
      const updatedDoor: DoorPatchRequest = { id: 1, name: 'Door1 Updated', isadmin: false, email: 'door1@example.com' };
      const returnedDoor: Door = { id: 1, name: 'Door1 Updated', door_groups: [], created_at: new Date() };

      const response: DoorResponse = {
        code: 200,
        description: '',
        data: returnedDoor
      };

      service.updateDoor(updatedDoor).subscribe(door => {
        expect(door).toEqual(returnedDoor);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('PATCH');
      req.flush(response);
    });
  });

  describe('#deleteDoorByID', () => {
    it('should delete a door by ID and return the deleted door', () => {
      const deletedDoor: Door = { id: 1, name: 'Door1', door_groups: [1], created_at: new Date() };

      const response: DoorResponse = {
        code: 200,
        description: '',
        data: deletedDoor
      };

      service.deleteDoorByID(1).subscribe(door => {
        expect(door).toEqual(deletedDoor);
      });

      const req = httpMock.expectOne(apiUrl + '1');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });

});
