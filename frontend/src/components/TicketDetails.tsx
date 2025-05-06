// src/components/TicketDetails.tsx
import { useState, useEffect } from "react";
import type { Ticket, TicketStatus } from "../types";
import { updateTicket } from "../services/api";

interface TicketDetailsProps {
  ticket: Ticket;
  onClose: () => void;
}

const TicketDetails = ({ ticket, onClose }: TicketDetailsProps) => {
  const [status, setStatus] = useState<TicketStatus>(ticket.status);
  const [notes, setNotes] = useState(ticket.notes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Format the date for better readability
  const formattedDate = new Date(ticket.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Add modal-open class to body when component mounts
  useEffect(() => {
    document.body.classList.add("modal-open");

    // Remove the class when component unmounts
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await updateTicket(ticket.id, {
        status: status,
        notes: notes,
      });
      setSuccessMessage("Ticket updated successfully");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError("Failed to update ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Ticket Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h6 className="mb-0">Customer Information</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p className="mb-1">
                      <strong>Name:</strong> {ticket.customerName}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {ticket.email}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-1">
                      <strong>Created:</strong> {formattedDate}
                    </p>
                    <p className="mb-1">
                      <strong>Ticket ID:</strong> {ticket.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header bg-light">
                <h6 className="mb-0">Status</h6>
              </div>
              <div className="card-body">
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="statusOpen"
                      value="OPEN"
                      checked={status === "OPEN"}
                      onChange={() => setStatus("OPEN")}
                    />
                    <label
                      className="form-check-label text-danger"
                      htmlFor="statusOpen"
                    >
                      <i className="bi bi-exclamation-circle me-1"></i> Open
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="statusPending"
                      value="PENDING"
                      checked={status === "PENDING"}
                      onChange={() => setStatus("PENDING")}
                    />
                    <label
                      className="form-check-label text-warning"
                      htmlFor="statusPending"
                    >
                      <i className="bi bi-hourglass-split me-1"></i> Pending
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="statusDone"
                      value="DONE"
                      checked={status === "DONE"}
                      onChange={() => setStatus("DONE")}
                    />
                    <label
                      className="form-check-label text-success"
                      htmlFor="statusDone"
                    >
                      <i className="bi bi-check-circle me-1"></i> Done
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header bg-light">
                <h6 className="mb-0">Notes</h6>
              </div>
              <div className="card-body">
                <textarea
                  className="form-control"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  placeholder="Add ticket notes here..."
                ></textarea>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {successMessage && (
              <div className="alert alert-success" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                {successMessage}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-save me-2"></i>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
