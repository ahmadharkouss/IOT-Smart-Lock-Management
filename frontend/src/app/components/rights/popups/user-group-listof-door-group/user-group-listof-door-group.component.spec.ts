import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupListofDoorGroupComponent } from './user-group-listof-door-group.component';

describe('UserGroupListofDoorGroupComponent', () => {
  let component: UserGroupListofDoorGroupComponent;
  let fixture: ComponentFixture<UserGroupListofDoorGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGroupListofDoorGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGroupListofDoorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
