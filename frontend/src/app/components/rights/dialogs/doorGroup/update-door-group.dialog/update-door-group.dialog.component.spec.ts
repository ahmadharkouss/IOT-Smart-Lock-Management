import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoorGroupDialogComponent } from './update-door-group.dialog.component';

describe('UpdateDoorGroupDialogComponent', () => {
  let component: UpdateDoorGroupDialogComponent;
  let fixture: ComponentFixture<UpdateDoorGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDoorGroupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDoorGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
