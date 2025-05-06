// src/types/index.ts
export type TicketStatus = 'OPEN' | 'PENDING' | 'DONE';

export interface Ticket {
  id: string;
  customerName: string;
  email: string;
  createdAt: string;
  status: TicketStatus;
  notes: string;
}