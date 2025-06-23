import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserGroupTodoorGroupComponent } from './adduser-group-todoor-group.component';

describe('AdduserGroupTodoorGroupComponent', () => {
  let component: AdduserGroupTodoorGroupComponent;
  let fixture: ComponentFixture<AdduserGroupTodoorGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdduserGroupTodoorGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdduserGroupTodoorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
