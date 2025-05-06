// src/components/TicketCard.tsx
import { useState } from "react";
import type { Ticket } from "../types";
import TicketDetails from "./TicketDetails";

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  // Format the date for better readability
  const formattedDate = new Date(ticket.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Determine status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "OPEN":
        return "badge bg-danger";
      case "PENDING":
        return "badge bg-warning text-dark";
      case "DONE":
        return "badge bg-success";
      default:
        return "badge bg-secondary";
    }
  };

  // Determine status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bi-exclamation-circle";
      case "PENDING":
        return "bi-hourglass-split";
      case "DONE":
        return "bi-check-circle";
      default:
        return "bi-question-circle";
    }
  };

  return (
    <>
      <div className="card h-100 border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">{ticket.customerName}</h5>
            <span className={getStatusBadgeClass(ticket.status)}>
              <i className={`bi ${getStatusIcon(ticket.status)} me-1`}></i>
              {ticket.status}
            </span>
          </div>

          <div className="mb-3">
            <p className="card-text mb-1">
              <i className="bi bi-envelope me-2 text-muted"></i>
              {ticket.email}
            </p>
            <p className="card-text mb-0">
              <i className="bi bi-calendar-event me-2 text-muted"></i>
              {formattedDate}
            </p>
          </div>

          <div className="mb-3">
            <p className="card-text">
              <strong>Notes:</strong>{" "}
              {ticket.notes ? (
                ticket.notes.length > 100 ? (
                  ticket.notes.substring(0, 100) + "..."
                ) : (
                  ticket.notes
                )
              ) : (
                <span className="text-muted fst-italic">No notes</span>
              )}
            </p>
          </div>

          <div className="text-end mt-auto">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => setShowDetails(true)}
            >
              <i className="bi bi-eye me-1"></i> View Details
            </button>
          </div>
        </div>
      </div>

      {showDetails && (
        <TicketDetails ticket={ticket} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
};

export default TicketCard;
