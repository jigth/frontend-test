import { configureStore } from "@reduxjs/toolkit";
import { eventsReducer } from "./events/slice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewareFunctionGoesHere),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
