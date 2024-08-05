export const backendAPI = import.meta.env.VITE_BACKEND_API ?? "http://localhost:3000";

/** Helps to get the base API endpoint for any domain object using the backend (events, mobile settings, etc.) */
export const getAPIEndpoint = (domainObjectName: "EVENTS" | "MOBILE_SETTINGS" | "" = "") => {
  switch (domainObjectName) {
    case "EVENTS":
      return `${backendAPI}/events`;
    case "MOBILE_SETTINGS":
      return `${backendAPI}/mobile-settings`;
    default:
      return backendAPI;
  }
};
