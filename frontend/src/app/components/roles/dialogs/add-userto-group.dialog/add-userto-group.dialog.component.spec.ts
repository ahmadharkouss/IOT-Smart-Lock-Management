import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsertoGroupDialogComponent } from './add-userto-group.dialog.component';

describe('AddUsertoGroupDialogComponent', () => {
  let component: AddUsertoGroupDialogComponent;
  let fixture: ComponentFixture<AddUsertoGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUsertoGroupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUsertoGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
