import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserGroupDialogComponent } from './create-userGroup.dialog.component';

describe('CreateGroupDialogComponent', () => {
  let component: CreateUserGroupDialogComponent;
  let fixture: ComponentFixture<CreateUserGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserGroupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
