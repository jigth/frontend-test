import EventsTable from "./components/Table";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>See Tickets </h1>
      
      <EventsTable />
    </div>
  );
}

export default App;
