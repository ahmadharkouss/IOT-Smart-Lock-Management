import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsDashboardComponent } from './options.dashboard.component';

describe('OptionsDashboardComponent', () => {
  let component: OptionsDashboardComponent;
  let fixture: ComponentFixture<OptionsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
