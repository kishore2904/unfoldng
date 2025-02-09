export interface User {
    user_id: number;
    userName: string;
    firstName: string | null;
    lastName: string | null;
    emailAddress: string;
    password: string;
    phoneNumber: string | null;
    address: string | null;
    city?: string;  // Optional fields
    state?: string;
    zipCode?: string;
    create_ts?: string | null;
    update_ts?: string | null;
  }
  