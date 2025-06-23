import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersPopupComponent } from './list-users.popup.component';

describe('ListUsersPopupComponent', () => {
  let component: ListUsersPopupComponent;
  let fixture: ComponentFixture<ListUsersPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUsersPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
