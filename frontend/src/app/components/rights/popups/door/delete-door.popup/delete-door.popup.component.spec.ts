import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDoorPopupComponent } from './delete-door.popup.component';

describe('DeleteDoorPopupComponent', () => {
  let component: DeleteDoorPopupComponent;
  let fixture: ComponentFixture<DeleteDoorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDoorPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDoorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
