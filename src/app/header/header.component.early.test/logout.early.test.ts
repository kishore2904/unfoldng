
// Unit tests for: logout


import { UserAuthService } from '../../_service/user-auth.service';
import { HeaderComponent } from '../header.component';


// Mock classes
class MockRouter {
  navigate = jest.fn();
}

class MockUserService {
  roleMatch = jest.fn();
}

describe('HeaderComponent.logout() logout method', () => {
  let component: HeaderComponent;
  let mockUserAuthService: UserAuthService;
  let mockRouter: MockRouter;
  let mockUserService: MockUserService;

  beforeEach(() => {
    mockUserAuthService = new UserAuthService();
    mockRouter = new MockRouter() as any;
    mockUserService = new MockUserService() as any;

    component = new HeaderComponent(
      mockUserAuthService as any,
      mockRouter as any,
      mockUserService as any
    );
  });

  describe('Happy paths', () => {
    it('should clear user data and navigate to home on logout', () => {
      // Arrange
      jest.spyOn(mockUserAuthService, 'clear');
      jest.spyOn(mockRouter, 'navigate');

      // Act
      component.logout();

      // Assert
      expect(mockUserAuthService.clear).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    });
  });

  describe('Edge cases', () => {
    it('should handle logout even if navigate fails', () => {
      // Arrange
      jest.spyOn(mockUserAuthService, 'clear');
      jest.spyOn(mockRouter, 'navigate').mockImplementation(() => {
        throw new Error('Navigation failed');
      });

      // Act
      try {
        component.logout();
      } catch (e) {
        // Handle the error if necessary
      }

      // Assert
      expect(mockUserAuthService.clear).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    });
  });
});

// End of unit tests for: logout
