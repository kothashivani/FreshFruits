export interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Password should not be stored in currentUser after login for security
}
