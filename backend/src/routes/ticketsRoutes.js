import express from "express";
import {
  getAllTickets,
  getTicketById,
  updateTicket,
} from "../controllers/ticketsControllers.js";

const router = express.Router();

// GET /tickets - List all tickets
router.get("/", getAllTickets);

// GET /tickets/:id - Retrieve a specific ticket
router.get("/:id", getTicketById);

// PATCH /tickets/:id - Update ticket status and notes
router.patch("/:id", updateTicket);

export default router;
