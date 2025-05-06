// src/services/api.ts
// src/services/api.ts
import type { Ticket } from "../types/index";

const API_URL = 'http://localhost:8001';

export const fetchTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await fetch(`${API_URL}/tickets`);
    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export const fetchTicketById = async (id: string): Promise<Ticket> => {
  try {
    const response = await fetch(`${API_URL}/tickets/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch ticket');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ticket with id ${id}:`, error);
    throw error;
  }
};

export const updateTicket = async (id: string, data: { status?: string; notes?: string }): Promise<Ticket> => {
  try {
    const response = await fetch(`${API_URL}/tickets/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update ticket');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating ticket with id ${id}:`, error);
    throw error;
  }
};