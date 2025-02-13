import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountBuyAgainComponent } from './my-account-buy-again.component';

describe('MyAccountBuyAgainComponent', () => {
  let component: MyAccountBuyAgainComponent;
  let fixture: ComponentFixture<MyAccountBuyAgainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountBuyAgainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAccountBuyAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
