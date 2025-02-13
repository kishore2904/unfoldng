export interface CustomerQuery {
    fullName: string;
    email: string;
    subject: string;
    message: string;
    userId?: number; // Optional for guest users
  }
  