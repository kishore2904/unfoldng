
// Unit tests for: initialiseForm


import { Validators } from '@angular/forms';
import { LoginComponent } from '../login.component';




class MockFormGroup {
  controls: any = {
    userName: { value: '', setValidators: jest.fn(), updateValueAndValidity: jest.fn() },
    userPassword: { value: '', setValidators: jest.fn(), updateValueAndValidity: jest.fn() },
  };
  valid: boolean = true;
  get = jest.fn().mockReturnValue(this.controls);
}

class MockFormBuilder {
  group = jest.fn().mockReturnValue(new MockFormGroup() as any);
}

class MockRouter {
  navigate = jest.fn();
}

class MockActivatedRoute {}

describe('LoginComponent.initialiseForm() initialiseForm method', () => {
  let component: LoginComponent;
  let mockFormBuilder: MockFormBuilder;
  let mockRouter: MockRouter;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(() => {
    mockFormBuilder = new MockFormBuilder();
    mockRouter = new MockRouter();
    mockActivatedRoute = new MockActivatedRoute();

    component = new LoginComponent(
      mockFormBuilder as any,
      mockRouter as any,
      mockActivatedRoute as any
    );
  });

  describe('Happy Paths', () => {
    it('should initialize the form with email and password controls', () => {
      // Arrange
      const expectedControls = {
        userName: ['', [Validators.required, Validators.email]],
        userPassword: ['', [Validators.required, Validators.minLength(6)]],
      };

      // Act
      component.initialiseForm();

      // Assert
      expect(mockFormBuilder.group).toHaveBeenCalledWith(expectedControls);
    });

    it('should create a valid form group', () => {
      // Act
      component.initialiseForm();

      // Assert
      expect(component.userForm.valid).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle form initialization when formBuilder returns an invalid form', () => {
      // Arrange
      const invalidFormGroup = new MockFormGroup();
      invalidFormGroup.valid = false;
      mockFormBuilder.group = jest.fn().mockReturnValue(invalidFormGroup as any);

      // Act
      component.initialiseForm();

      // Assert
      expect(component.userForm.valid).toBe(false);
    });

    it('should handle form initialization with missing validators', () => {
      // Arrange
      const formGroupWithoutValidators = new MockFormGroup();
      formGroupWithoutValidators.controls.userName.setValidators = jest.fn();
      formGroupWithoutValidators.controls.userPassword.setValidators = jest.fn();
      mockFormBuilder.group = jest.fn().mockReturnValue(formGroupWithoutValidators as any);

      // Act
      component.initialiseForm();

      // Assert
      expect(formGroupWithoutValidators.controls.userName.setValidators).toHaveBeenCalled();
      expect(formGroupWithoutValidators.controls.userPassword.setValidators).toHaveBeenCalled();
    });
  });
});

// End of unit tests for: initialiseForm
