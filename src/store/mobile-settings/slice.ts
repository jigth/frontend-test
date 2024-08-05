import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MobileSetting } from "../../models/settings";
import { getMobileSettingDefaultValues } from "../../constants/mobileSettings";

const getInitialState = (): MobileSetting => {
  return getMobileSettingDefaultValues();
};

export const mobileSettings = createSlice({
  name: "mobileSettings",
  initialState: getInitialState(),
  reducers: {
    replaceMobileSetting(_state, action: PayloadAction<MobileSetting>) {
      return action.payload;
    },
  },
});

export const mobileSettingsReducer = mobileSettings.reducer;

export const { replaceMobileSetting } = mobileSettings.actions;
