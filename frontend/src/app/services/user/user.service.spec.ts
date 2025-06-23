import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User, UserRespsonse } from '../../interfaces/responses/user.response.interface';
import { UserRequest, UserPatchRequest } from '../../interfaces/requests/user.request.interface';
import { environment } from '../../../environments/environment';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.api + 'admin/user/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  describe('#getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers: User[] = [
        { id: 1, name: 'John', email: 'john@example.com', is_admin: true, user_groups: [], CreatedAt: new Date() },
        { id: 2, name: 'Jane', email: 'jane@example.com', is_admin: false, user_groups: [], CreatedAt: new Date() }
      ];

      const response: UserRespsonse = {
        code: 200,
        description: '',
        data: dummyUsers
      };

      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne(apiUrl + 'all');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });




  describe('#getUserByID', () => {
    it('should return an Observable<User>', () => {
      const dummyUser: User = { id: 1, name: 'John', email: 'john@example.com', is_admin: true, user_groups: [], CreatedAt: new Date() };

      const response: UserRespsonse = {
        code: 200,
        description: '',
        data: dummyUser
      };

      service.getUserByID(1).subscribe(user => {
        expect(user).toEqual(dummyUser);
      });

      const req = httpMock.expectOne(apiUrl + '1');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });



  describe('#createUser', () => {
    it('should create a new user and return it', () => {
      const newUser: UserRequest = { name: 'John', isadmin: true, email: 'john@example.com' };
      const createdUser: User = { id: 1, name: 'John', email: 'john@example.com', is_admin: true, user_groups: [], CreatedAt: new Date() };

      const response: UserRespsonse = {
        code: 200,
        description: '',
        data: createdUser
      };

      service.createUser(newUser).subscribe(user => {
        expect(user).toEqual(createdUser);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(response);
    });
  });

  describe('#updateUser', () => {
    it('should update an existing user and return it', () => {
      const updatedUser: UserPatchRequest = { id: 1, name: 'John Updated', isadmin: true, email: 'john.updated@example.com' };
      const returnedUser: User = { id: 1, name: 'John Updated', email: 'john.updated@example.com', is_admin: true, user_groups: [], CreatedAt: new Date() };

      const response: UserRespsonse = {
        code: 200,
        description: '',
        data: returnedUser
      };

      service.updateUser(updatedUser).subscribe(user => {
        expect(user).toEqual(returnedUser);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('PATCH');
      req.flush(response);
    });
  });

  describe('#deleteUserByID', () => {
    it('should delete a user by ID and return the deleted user', () => {
      const deletedUser: User = { id: 1, name: 'John', email: 'john@example.com', is_admin: true, user_groups: [], CreatedAt: new Date() };

      const response: UserRespsonse = {
        code: 200,
        description: '',
        data: deletedUser
      };

      service.deleteUserByID(1).subscribe(user => {
        expect(user).toEqual(deletedUser);
      });

      const req = httpMock.expectOne(apiUrl + '1');
      expect(req.request.method).toBe('GET');
      req.flush(response);
    });
  });
});
