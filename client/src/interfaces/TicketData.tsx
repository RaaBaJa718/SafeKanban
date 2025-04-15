import { UserData } from './UserData';

export interface TicketData {
  id: number | null;
  name: string | null;
  description: string | null;
  status: string | null;
  assignedUserId: number | null;
  assignedUser: UserData | null;
  priority: string | null; // Example values: "High", "Medium", "Low"
  dueDate: string | null; // ISO date string (e.g., "2025-04-15T00:00:00Z")
}
