import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorGroupComponent } from './door-group.component';

describe('DoorGroupComponent', () => {
  let component: DoorGroupComponent;
  let fixture: ComponentFixture<DoorGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoorGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
