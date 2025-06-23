import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDoorDialogComponent } from './create-door.dialog.component';

describe('CreateDoorDialogComponent', () => {
  let component: CreateDoorDialogComponent;
  let fixture: ComponentFixture<CreateDoorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDoorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDoorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
