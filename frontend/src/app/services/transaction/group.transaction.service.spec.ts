import { TestBed } from '@angular/core/testing';

import { GroupTransactionService } from './group.transaction.service';

describe('GroupTransactionService', () => {
  let service: GroupTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
