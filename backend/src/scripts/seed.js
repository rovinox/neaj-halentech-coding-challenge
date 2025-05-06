import { prisma } from "../DB/prismaClient.js";

// Define ticket data
const ticketData = [
  {
    customerName: "Jane Doe",
    email: "jane.doe@example.com",
    createdAt: new Date("2024-01-15T12:00:00Z"),
    status: "OPEN",
    notes: "",
  },
  {
    customerName: "John Smith",
    email: "john.smith@example.com",
    createdAt: new Date("2024-01-18T09:30:00Z"),
    status: "PENDING",
    notes: "Waiting for customer response on integration questions",
  },
  {
    customerName: "Alice Johnson",
    email: "alice.johnson@example.com",
    createdAt: new Date("2024-01-20T14:45:00Z"),
    status: "DONE",
    notes: "Successfully onboarded. Training session completed on Jan 25th",
  },
  {
    customerName: "Bob Williams",
    email: "bob.williams@example.com",
    createdAt: new Date("2024-01-22T11:15:00Z"),
    status: "OPEN",
    notes: "Need to schedule initial consultation call",
  },
  {
    customerName: "Eva Garcia",
    email: "eva.garcia@example.com",
    createdAt: new Date("2024-01-25T16:20:00Z"),
    status: "PENDING",
    notes: "Waiting for contract approval from legal team",
  },
];

// Main seed function
async function main() {
  console.log("Starting database seeding...");

  try {
    console.log("Testing database connection...");
    await prisma.$connect();
    console.log("Database connection successful!");

    console.log("Clearing existing tickets...");
    await prisma.ticket.deleteMany({});
    console.log("Cleared existing tickets");

    console.log("Inserting new tickets...");
    for (const ticket of ticketData) {
      const result = await prisma.ticket.create({
        data: ticket,
      });
      console.log(
        `Created ticket for ${ticket.customerName} with ID: ${result.id}`
      );
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("Disconnected from database");
  }
}

// Run the seeding
main();
