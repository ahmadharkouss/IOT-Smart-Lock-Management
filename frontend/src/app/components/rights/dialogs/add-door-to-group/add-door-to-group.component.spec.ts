import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoorToGroupComponent } from './add-door-to-group.component';

describe('AddDoorToGroupComponent', () => {
  let component: AddDoorToGroupComponent;
  let fixture: ComponentFixture<AddDoorToGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDoorToGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoorToGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
