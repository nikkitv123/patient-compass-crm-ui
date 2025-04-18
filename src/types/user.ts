
export type UserRole = "admin" | "crm_user" | "doctor" | "marketing";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  position: string;
  avatar?: string;
}
