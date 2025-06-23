import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsDashboardComponent } from './rights.dashboard.component';

describe('RightsDashboardComponent', () => {
  let component: RightsDashboardComponent;
  let fixture: ComponentFixture<RightsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
