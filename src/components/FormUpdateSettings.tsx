import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CustomerInfo,
  DeliveryMethod,
  FulfillmentFormat,
  MobileSetting,
  PaymentMethods,
  PrintingFormat,
  Scanning,
  TicketDisplay,
} from "../models/settings";
import { getAPIEndpoint } from "../constants/apis";

function FormUpdateSettings() {
  const getMobileSettingDefaultValues = (): MobileSetting => {
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

  const [mobileSetting, setMobileSetting] = useState<MobileSetting>(getMobileSettingDefaultValues());
  const [clientsIdsList, setClientsIdsList] = useState<number[]>([1]);

  const handleFormSubmit = (formValues: FormikMobileSetting) => {
    console.log("Submit", { formValues });
  };

  const validationSchema = Yup.object({
    clientId: Yup.number().oneOf([1], "Client ID should be 1"),
  });

  type FormikMobileSetting = Omit<MobileSetting, "deliveryMethods"> & { deliveryMethods: string[] };

  /** Transforms mobile setting state to a format more friendly with the form */
  const convertMobileStateToFormik = (mobileSetting: MobileSetting): FormikMobileSetting => {
    return {
      ...mobileSetting,
      deliveryMethods: mobileSetting.deliveryMethods.map((dm: DeliveryMethod) => dm.enum),
    };
  };

  const { errors, values, setValues, handleSubmit, handleChange } = useFormik<FormikMobileSetting>({
    initialValues: convertMobileStateToFormik(mobileSetting),
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  useEffect(() => {
    const mobileSettingsURL = getAPIEndpoint("MOBILE_SETTINGS");
    fetch(`${mobileSettingsURL}/${values.clientId}`)
      .then((res) => (!res.ok ? Promise.reject(new Error(`Could not make request. ${res.statusText}`)) : res.json()))
      .then((response) => {
        const newMobileSetting: MobileSetting = response.data;
        setMobileSetting(newMobileSetting);
        setValues(convertMobileStateToFormik(newMobileSetting));
      })
      .catch((err) => console.log(err));
  }, [values.clientId]);

  useEffect(() => {
    const mobileSettingsURL = getAPIEndpoint("MOBILE_SETTINGS");
    fetch(`${mobileSettingsURL}/clients-ids`)
      .then((res) => (!res.ok ? Promise.reject(new Error(`Could not make request. ${res.statusText}`)) : res.json()))
      .then((response) => {
        setClientsIdsList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      clientId - {clientsIdsList && values.clientId}
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <div style={{ width: "300px" }}>values {JSON.stringify(values)}</div>
          <FormControl>
            <FormLabel>Client ID</FormLabel>
            <Select id="clientId" name="clientId" onChange={handleChange} value={values.clientId}>
              {clientsIdsList &&
                clientsIdsList.map((clientId: number, i: number) => (
                  <MenuItem key={i} value={clientId}>
                    Client {clientId}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>Select a client ID to update their settings</FormHelperText>
            <small style={{ color: "red" }}>{errors.clientId && errors.clientId}</small>
          </FormControl>
          <FormControl>
            <FormLabel>Delivery Methods</FormLabel>
            <Select
              id="deliveryMethods"
              name="deliveryMethods"
              multiple
              value={values.deliveryMethods ?? []}
              onChange={handleChange}
            >
              {mobileSetting &&
                mobileSetting.deliveryMethods &&
                mobileSetting.deliveryMethods.map((deliveryMethod: DeliveryMethod, i: number) => (
                  <MenuItem key={i} selected={deliveryMethod.selected} value={deliveryMethod.enum}>
                    {deliveryMethod.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Fulfillment Format</FormLabel>
            <Grid>
              <FormGroup>
                {(Object.keys(values.fulfillmentFormat) as Array<keyof FulfillmentFormat>).map(
                  (key: keyof FulfillmentFormat, i: number) => (
                    <FormControlLabel
                      key={i}
                      name={`fulfillmentFormat.${key}`}
                      value={values.fulfillmentFormat[key]}
                      onChange={handleChange}
                      control={<Checkbox checked={values.fulfillmentFormat[key]} />}
                      label={`${key}`}
                    />
                  ),
                )}
              </FormGroup>
            </Grid>
          </FormControl>
          <FormControl>
            <FormLabel>Printer</FormLabel>
            <TextField placeholder="Printer id" helperText="You can leave it blank or modify it here"></TextField>
          </FormControl>
          <FormControl>
            <FormLabel>Printing Format</FormLabel>
            <Grid>
              <FormGroup>
                {(Object.keys(values.printingFormat) as Array<keyof PrintingFormat>).map(
                  (key: keyof PrintingFormat, i: number) => (
                    <FormControlLabel
                      key={i}
                      name={`printingFormat.${key}`}
                      value={values.printingFormat[key]}
                      onChange={handleChange}
                      control={<Checkbox checked={values.printingFormat[key]} />}
                      label={`${key}`}
                    />
                  ),
                )}
              </FormGroup>
            </Grid>
          </FormControl>
          <FormControl>
            <FormLabel>Scanning</FormLabel>
            <Grid>
              <FormGroup>
                {(Object.keys(values.scanning) as Array<keyof Scanning>).map((key: keyof Scanning, i: number) => (
                  <FormControlLabel
                    key={i}
                    name={`scanning.${key}`}
                    value={values.scanning[key]}
                    onChange={handleChange}
                    control={<Checkbox checked={values.scanning[key]} />}
                    label={`${key}`}
                  />
                ))}
              </FormGroup>
            </Grid>
          </FormControl>
          <FormControl>
            <FormLabel>Payment Methods</FormLabel>
            <Grid>
              <FormGroup>
                {(Object.keys(values.paymentMethods) as Array<keyof PaymentMethods>).map(
                  (key: keyof PaymentMethods, i: number) => (
                    <FormControlLabel
                      key={i}
                      name={`paymentMethods.${key}`}
                      value={values.paymentMethods[key]}
                      onChange={handleChange}
                      control={<Checkbox checked={values.paymentMethods[key]} />}
                      label={`${key}`}
                    />
                  ),
                )}
              </FormGroup>
            </Grid>
          </FormControl>
          <FormControl>
            <FormLabel>Ticket Display</FormLabel>
            <Grid>
              <FormGroup>
                {(Object.keys(values.ticketDisplay) as Array<keyof TicketDisplay>).map(
                  (key: keyof TicketDisplay, i: number) => (
                    <FormControlLabel
                      key={i}
                      name={`ticketDisplay.${key}`}
                      value={values.ticketDisplay[key]}
                      onChange={handleChange}
                      control={<Checkbox checked={values.ticketDisplay[key]} />}
                      label={`${key}`}
                    />
                  ),
                )}
              </FormGroup>
            </Grid>
          </FormControl>
          <FormControl>
            <FormLabel>Customer Info</FormLabel>
            <Grid>
              <FormGroup>
                {(Object.keys(values.customerInfo) as Array<keyof CustomerInfo>).map(
                  (key: keyof CustomerInfo, i: number) => (
                    <FormControlLabel
                      key={i}
                      name={`customerInfo.${key}`}
                      value={values.customerInfo[key]}
                      onChange={handleChange}
                      control={<Checkbox checked={values.customerInfo[key]} />}
                      label={`${key}`}
                    />
                  ),
                )}
              </FormGroup>
            </Grid>
          </FormControl>
          <FormControl>
            <Button type="submit">Submit</Button>
          </FormControl>
        </Stack>
      </form>
    </div>
  );
}

export default FormUpdateSettings;
