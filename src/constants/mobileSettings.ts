import { MobileSetting } from "../models/settings";

export const getMobileSettingDefaultValues = (): MobileSetting => {
  return {
    clientId: 1,
    deliveryMethods: [],
    fulfillmentFormat: {
      rfid: false,
      print: false,
    },
    printer: {
      id: "",
    },
    printingFormat: {
      formatA: false,
      formatB: false,
    },
    scanning: {
      scanManually: false,
      scanWhenComplete: false,
    },
    paymentMethods: {
      cash: false,
      creditCard: false,
      comp: false,
    },
    ticketDisplay: {
      leftInAllotment: false,
      soldOut: false,
    },
    customerInfo: {
      active: false,
      basicInfo: false,
      addressInfo: false,
    },
  };
};
