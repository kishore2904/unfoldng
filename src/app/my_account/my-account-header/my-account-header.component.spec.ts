import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountHeaderComponent } from './my-account-header.component';

describe('MyAccountHeaderComponent', () => {
  let component: MyAccountHeaderComponent;
  let fixture: ComponentFixture<MyAccountHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAccountHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
