// src/App.tsx
import TicketList from "./components/TicketList";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-primary text-white py-3 shadow">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="h3 mb-0">Halen Technologies</h1>
            </div>
            <div className="col-md-6 text-md-end mt-2 mt-md-0">
              <h2 className="h5 mb-0">Customer Onboarding Ticket Management</h2>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow-1 py-4">
        <div className="container">
          <TicketList />
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p className="mb-0">
            © {new Date().getFullYear()} Halen Technologies - Internal Support
            Tool
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
