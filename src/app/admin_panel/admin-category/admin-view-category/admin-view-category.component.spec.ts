import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewCategoryComponent } from './admin-view-category.component';

describe('AdminViewCategoryComponent', () => {
  let component: AdminViewCategoryComponent;
  let fixture: ComponentFixture<AdminViewCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
