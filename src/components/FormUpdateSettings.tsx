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
import { DeliveryMethod, MobileSetting } from "../models/settings";

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
    console.log("Submit", {formValues});
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
    console.log({ clientIdIs: values.clientId });
    fetch(`http://localhost:3000/mobile-settings/${values.clientId}`)
      .then((res) => (!res.ok ? Promise.reject(new Error(`Could not make request. ${res.statusText}`)) : res.json()))
      .then((response) => {
        const newMobileSetting: MobileSetting = response.data;
        setMobileSetting(newMobileSetting);
        setValues(convertMobileStateToFormik(newMobileSetting));
      })
      .catch((err) => console.log(err));
  }, [values.clientId]);

  useEffect(() => {
    fetch("http://localhost:3000/mobile-settings/clients-ids")
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
                <FormControlLabel
                  control={
                    <Checkbox
                      id="fulfillmentFormat"
                      name="fulfillmentFormat.rfid"
                      onChange={handleChange}
                      checked={values.fulfillmentFormat.rfid}
                    />
                  }
                  label="RF ID"
                />
                <FormControlLabel
                  control={<Checkbox checked={values.fulfillmentFormat.print} />}
                  label="Print"
                  name="fulfillmentFormat.print"
                  onChange={handleChange}
                />
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
                <FormControlLabel
                  name="printingFormat.formatA"
                  value={values.printingFormat.formatA}
                  onChange={handleChange}
                  control={<Checkbox checked={values.printingFormat.formatA} />}
                  label="Format A"
                />
                <FormControlLabel
                  name="printingFormat.formatB"
                  value={values.printingFormat.formatB}
                  onChange={handleChange}
                  control={<Checkbox checked={values.printingFormat.formatB} />}
                  label="Format B"
                />
              </FormGroup>
            </Grid>
          </FormControl>
          <FormControl>
            <FormLabel>Scanning</FormLabel>
            <Grid>
              {/* <FormGroup>
                <FormControlLabel value="sample1" control={<Checkbox />} label="Scan Manually" />
                <FormControlLabel value="sample" control={<Checkbox />} label="Scan When Complete" />
              </FormGroup> */}

              <FormGroup>
                <FormControlLabel
                  name="scanning.scanManually"
                  value={values.scanning.scanManually}
                  onChange={handleChange}
                  control={<Checkbox checked={values.scanning.scanManually} />}
                  label="Scan Manually"
                />
                <FormControlLabel
                  name="scanning.scanWhenComplete"
                  value={values.scanning.scanWhenComplete}
                  onChange={handleChange}
                  control={<Checkbox checked={values.scanning.scanWhenComplete} />}
                  label="Scan When Complete"
                />
              </FormGroup>
            </Grid>
          </FormControl>
          <FormControl>
            <FormLabel>Payment Methods</FormLabel>
            <Grid>
              <FormGroup>
                <FormControlLabel
                  name="paymentMethods.cash"
                  onChange={handleChange}
                  value={values.paymentMethods.cash}
                  control={<Checkbox checked={values.paymentMethods.cash} />}
                  label="Cash"
                />
                <FormControlLabel
                  name="paymentMethods.creditCard"
                  onChange={handleChange}
                  value={values.paymentMethods.creditCard}
                  control={<Checkbox checked={values.paymentMethods.creditCard} />}
                  label="Credit Card"
                />
                <FormControlLabel
                  name="paymentMethods.comp"
                  onChange={handleChange}
                  value={values.paymentMethods.comp}
                  control={<Checkbox checked={values.paymentMethods.comp} />}
                  label="Comp"
                />
              </FormGroup>
            </Grid>
          </FormControl>
          <FormControl>
            <FormLabel>Ticket Display</FormLabel>
            <Grid>
              <FormGroup>
                <FormControlLabel
                  name="ticketDisplay.leftInAllotment"
                  onChange={handleChange}
                  value={values.ticketDisplay.leftInAllotment}
                  control={<Checkbox checked={values.ticketDisplay.leftInAllotment} />}
                  label="Left In Allotment"
                />
                <FormControlLabel
                  name="ticketDisplay.soldOut"
                  onChange={handleChange}
                  value={values.ticketDisplay.soldOut}
                  control={<Checkbox checked={values.ticketDisplay.soldOut} />}
                  label="Sold Out"
                />
              </FormGroup>
            </Grid>
          </FormControl>
          <FormControl>
            <FormLabel>Customer Info</FormLabel>
            <Grid>
              <FormGroup>
                <FormControlLabel
                  name="customerInfo.active"
                  value={values.customerInfo.active}
                  onChange={handleChange}
                  control={<Checkbox checked={values.customerInfo.active} />}
                  label="Active"
                />
                <FormControlLabel
                  name="customerInfo.basicInfo"
                  value={values.customerInfo.basicInfo}
                  onChange={handleChange}
                  control={<Checkbox checked={values.customerInfo.basicInfo} />}
                  label="Basic Info"
                />
                <FormControlLabel
                  name="customerInfo.addressInfo"
                  value={values.customerInfo.addressInfo}
                  onChange={handleChange}
                  control={<Checkbox checked={values.customerInfo.addressInfo} />}
                  label="Address Info"
                />
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
