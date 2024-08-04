import EventsTable from "./components/EventsTable";
import FormUpdateTickets from "./components/FormUpdateTickets";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        // height: "100vh", // NOTE: Commented out to avoid using multiple pages and a router. I may refactor to that solution later.
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>See Tickets </h1>
      <EventsTable />

      <h1>Update Settings</h1>
      <FormUpdateTickets />
    </div>
  );
}

export default App;
