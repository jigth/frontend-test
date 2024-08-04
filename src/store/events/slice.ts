import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Event } from "../../models/event";

const getInitialState = (): Event[] => {
  return [
    {
      id: 1,
      name: "coepi summisse viridis",
      description:
        "Sordeo conservo odit quidem confero verto earum vir ars absum. Voluptas absorbeo ipsam teneo eius vester inflammatio. Depromo suffoco voluptatem velut tollo consequuntur ciminatio complectus volaticus amo.",
      location: "Rickyberg",
      date: "2025-07-21T19:55:11.338Z",
      availableTickets: [],
    },
    {
      id: 2,
      name: "demitto ustilo utpote",
      description:
        "Suscipit impedit cras officiis autus adamo trucido umerus basium surgo. Tempora consuasor cruentus ducimus spargo illum voluptate suggero tabgo. Timidus capitulus vigilo.",
      location: "New Murielberg",
      date: "2025-05-24T04:52:48.717Z",
      availableTickets: [],
    },
  ];
};

export const eventsSlice = createSlice({
  name: "events",
  initialState: getInitialState(),
  reducers: {
    replaceEvents(state, action: PayloadAction<Event[]>) {
      return action.payload;
    },
  },
});

export const eventsReducer = eventsSlice.reducer;

export const { replaceEvents } = eventsSlice.actions;
