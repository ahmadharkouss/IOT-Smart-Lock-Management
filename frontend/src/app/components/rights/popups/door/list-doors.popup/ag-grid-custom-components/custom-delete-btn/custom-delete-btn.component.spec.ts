import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDeleteBtnComponent } from './custom-delete-btn.component';

describe('CustomDeleteBtnComponent', () => {
  let component: CustomDeleteBtnComponent;
  let fixture: ComponentFixture<CustomDeleteBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDeleteBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDeleteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
