import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDoorGroupPopupComponent } from './delete-door-group.popup.component';

describe('DeleteDoorGroupPopupComponent', () => {
  let component: DeleteDoorGroupPopupComponent;
  let fixture: ComponentFixture<DeleteDoorGroupPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDoorGroupPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDoorGroupPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
