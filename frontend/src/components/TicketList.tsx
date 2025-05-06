// src/components/TicketList.tsx
import { useState, useEffect } from "react";
import { fetchTickets } from "../services/api";
import type { Ticket } from "../types";
import TicketCard from "./TicketCard";

const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const getTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tickets. Please try again later.");
        setLoading(false);
      }
    };

    getTickets();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await fetchTickets();
      setTickets(data);
      setError(null);
    } catch (err) {
      setError("Failed to refresh tickets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Filter tickets based on status and search query
  const filteredTickets = tickets.filter((ticket) => {
    // First filter by status
    if (filter !== "all" && ticket.status !== filter) {
      return false;
    }

    // Then filter by search query (case insensitive)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        ticket.customerName.toLowerCase().includes(query) ||
        ticket.email.toLowerCase().includes(query) ||
        ticket.notes.toLowerCase().includes(query)
      );
    }

    return true;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <p className="mb-2">{error}</p>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleRefresh}
        >
          <i className="bi bi-arrow-clockwise me-1"></i> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-5">
              <div
                className="btn-group"
                role="group"
                aria-label="Filter tickets"
              >
                <button
                  type="button"
                  className={`btn ${
                    filter === "all" ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`btn ${
                    filter === "OPEN" ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  onClick={() => setFilter("OPEN")}
                >
                  Open
                </button>
                <button
                  type="button"
                  className={`btn ${
                    filter === "PENDING"
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setFilter("PENDING")}
                >
                  Pending
                </button>
                <button
                  type="button"
                  className={`btn ${
                    filter === "DONE" ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  onClick={() => setFilter("DONE")}
                >
                  Done
                </button>
              </div>
            </div>

            <div className="col-md-2 text-md-end">
              <button className="btn btn-primary" onClick={handleRefresh}>
                <i className="bi bi-arrow-clockwise me-1"></i> Refresh
              </button>
            </div>
          </div>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="text-center py-5">
            <i
              className="bi bi-inbox bi-5x d-block text-muted mb-3"
              style={{ fontSize: "3rem" }}
            ></i>
            <p className="text-muted">
              No tickets found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredTickets.map((ticket) => (
              <div className="col-md-6 col-lg-4" key={ticket.id}>
                <TicketCard ticket={ticket} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketList;
