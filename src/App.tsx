import EventsTable from "./components/EventsTable";
import FormUpdateSettings from "./components/FormUpdateSettings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
      <h1>See Tickets </h1>
      <EventsTable />

      <h1 style={{ textAlign: "center" }}>Update Settings</h1>
      <FormUpdateSettings />
    </div>
  );
}

export default App;
