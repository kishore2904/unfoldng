import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeadersComponent } from './admin-headers.component';

describe('AdminHeadersComponent', () => {
  let component: AdminHeadersComponent;
  let fixture: ComponentFixture<AdminHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHeadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
