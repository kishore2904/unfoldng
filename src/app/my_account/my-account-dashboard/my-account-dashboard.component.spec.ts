import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountDashboardComponent } from './my-account-dashboard.component';

describe('MyAccountDashboardComponent', () => {
  let component: MyAccountDashboardComponent;
  let fixture: ComponentFixture<MyAccountDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAccountDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
