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
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { replaceMobileSetting } from "../store/mobile-settings/slice";

function FormUpdateSettings() {
  const dispatch = useAppDispatch();
  const mobileSetting = useAppSelector((state) => state.mobileSettings);

  const [clientsIdsList, setClientsIdsList] = useState<number[]>([1]);

  const handleFormSubmit = async (formValues: MobileSetting) => {
    const mobileSettingsURL = getAPIEndpoint("MOBILE_SETTINGS");
    try {
      const res = await fetch(mobileSettingsURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);

      console.log("Submit succesful", await res.json());

      alert("Setting updated succesfully");
    } catch (err: any) {
      console.log(`Could not send form submit. ${err.message}`);
      alert("Error updating setting");
    }
  };

  const validationSchema = Yup.object({
    clientId: Yup.number(),
    printer: Yup.object({
      id: Yup.string().nullable(),
    }),
  });

  const { errors, values, setValues, handleSubmit, handleChange } = useFormik<MobileSetting>({
    initialValues: mobileSetting,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  console.log({ errors });

  useEffect(() => {
    const mobileSettingsURL = getAPIEndpoint("MOBILE_SETTINGS");
    fetch(`${mobileSettingsURL}/${values.clientId}`)
      .then((res) => (!res.ok ? Promise.reject(new Error(`Could not make request. ${res.statusText}`)) : res.json()))
      .then((response) => {
        const { _id, ...newMobileSetting } = response.data;
        dispatch(replaceMobileSetting(newMobileSetting));
        setValues(newMobileSetting as MobileSetting);
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

  /** Custom management for select so Formik doesn't overwrites data but manipulates the "selected' property" */
  const handleSelectChange = (e: any) => {
    const selectedDMs = e.target.value as string[];
    const updatedDeliveryMethods = values.deliveryMethods.map((dm) => ({
      ...dm,
      selected: selectedDMs.includes(dm.enum),
    }));
    setValues({ ...values, deliveryMethods: updatedDeliveryMethods });
  };

  const renderValue = () =>
    (values.deliveryMethods ?? [])
      .filter((dm) => dm.selected)
      .map((dm) => dm.enum)
      .join(", ");

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
          </FormControl>
          <FormControl>
            <FormLabel>Delivery Methods</FormLabel>
            <Select
              id="deliveryMethods"
              name="deliveryMethods"
              multiple
              value={values.deliveryMethods.filter((dm) => dm.selected).map((dm) => dm.enum)}
              renderValue={renderValue}
              onChange={handleSelectChange}
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
            <TextField
              name="printer.id"
              value={values.printer.id ?? ""}
              onChange={(e) => {
                console.log({ eValue: e.target.value });
                handleChange(e);
              }}
              placeholder="Printer id"
              helperText="You can leave it blank or modify it here"
            ></TextField>
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
