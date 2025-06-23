import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDoorGroupDialogComponent } from './create-door-group.dialog.component';

describe('CreateDoorGroupDialogComponent', () => {
  let component: CreateDoorGroupDialogComponent;
  let fixture: ComponentFixture<CreateDoorGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDoorGroupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDoorGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
