import { prisma } from "../DB/prismaClient.js";

// Get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

// Get a single ticket by ID
export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};

// Update a ticket's status and notes
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    // Validate status input
    if (status && !["open", "pending", "done"].includes(status)) {
      return res.status(400).json({
        error: "Invalid status. Status must be 'open', 'pending', or 'done'.",
      });
    }

    // Update the ticket
    const updatedTicket = await prisma.ticket.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
      },
    });

    res.json(updatedTicket);
  } catch (error) {
    console.error("Error updating ticket:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(500).json({ error: "Failed to update ticket" });
  }
};
