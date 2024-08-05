/**
 * The following types were created from a JSON object using "https://transform.tools/json-to-typescript"
 */
export interface MobileSetting {
  clientId: number;
  deliveryMethods: DeliveryMethod[];
  fulfillmentFormat: FulfillmentFormat;
  printer: Printer;
  printingFormat: PrintingFormat;
  scanning: Scanning;
  paymentMethods: PaymentMethods;
  ticketDisplay: TicketDisplay;
  customerInfo: CustomerInfo;
}

export interface DeliveryMethod {
  name: string;
  enum: string;
  order: number;
  isDefault: boolean;
  selected: boolean;
}

interface FulfillmentFormat {
  rfid: boolean;
  print: boolean;
}

interface Printer {
  id?: string;
}

interface PrintingFormat {
  formatA: boolean;
  formatB: boolean;
}

interface Scanning {
  scanManually: boolean;
  scanWhenComplete: boolean;
}

interface PaymentMethods {
  cash: boolean;
  creditCard: boolean;
  comp: boolean;
}

interface TicketDisplay {
  leftInAllotment: boolean;
  soldOut: boolean;
}

interface CustomerInfo {
  active: boolean;
  basicInfo: boolean;
  addressInfo: boolean;
}
