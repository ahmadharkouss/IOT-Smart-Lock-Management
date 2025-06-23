import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserGroupPopupComponent } from './delete-user-group.popup.component';

describe('DeleteUserGroupPopupComponent', () => {
  let component: DeleteUserGroupPopupComponent;
  let fixture: ComponentFixture<DeleteUserGroupPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUserGroupPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserGroupPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
