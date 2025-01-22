import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  // Set roles in localStorage
  public setRoles(roles: []): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  // Get roles from localStorage
  public getRoles(): [] {
    const roles = localStorage.getItem('roles'); 
    return roles ? JSON.parse(roles) : []; 
  }

  // Set JWT token in localStorage
  public setToken(jwtToken: string): void {
    localStorage.setItem("jwtToken", jwtToken);
  }

  // Get JWT token from localStorage
  public getToken(): string {
    return localStorage.getItem("jwtToken") || '';
  }

  // Set user_id in localStorage
  public setUserId(userId: string): void {
    localStorage.setItem("user_id", userId);
  }

  // Get user_id from localStorage
  public getUserId(): string {
    return localStorage.getItem("user_id") || '';
  }

  // Clear localStorage (roles, token, user_id, etc.)
  public clear(): void {
    localStorage.clear();
  }

  // Check if the user is logged in by verifying roles and token
  public isLoggedIn(): boolean {
    return this.getRoles().length > 0 && !!this.getToken();
  }
}
