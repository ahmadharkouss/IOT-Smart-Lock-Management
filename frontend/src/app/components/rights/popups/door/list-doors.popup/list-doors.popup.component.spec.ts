import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDoorsPopupComponent } from './list-doors.popup.component';

describe('ListDoorsPopupComponent', () => {
  let component: ListDoorsPopupComponent;
  let fixture: ComponentFixture<ListDoorsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDoorsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDoorsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
