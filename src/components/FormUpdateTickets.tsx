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
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";

function FormUpdateTickets() {
  const [deliveryMethods, setDeliveryMethods] = useState<string[]>(["PRINT_NOW", "PRINT_AT_HOME"]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit");
  };

  const handleChangeDeliveryMethods = (event: SelectChangeEvent<typeof deliveryMethods>) => {
    const {
      target: { value },
    } = event;
    setDeliveryMethods(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Client ID</FormLabel>
            <Select defaultValue={1}>
              <MenuItem value={1}>Client 1</MenuItem>
              <MenuItem value={2}>Client 2</MenuItem>
            </Select>
            <FormHelperText>Select a client ID to update their settings</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>Delivery Methods</FormLabel>

            <Select multiple value={deliveryMethods} onChange={handleChangeDeliveryMethods}>
              <MenuItem value={"PRINT_NOW"}>Print Now</MenuItem>
              <MenuItem value={"PRINT_AT_HOME"}>Print@Home</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Fulfillment Format</FormLabel>
            <Grid>
              <FormGroup>
                <FormControlLabel value="sample1" control={<Checkbox />} label="RF ID" />
                <FormControlLabel value="sample" control={<Checkbox />} label="Print" />
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
              <RadioGroup defaultValue="sample1">
                <FormControlLabel value="sample1" control={<Radio />} label="Format A" />
                <FormControlLabel value="sample" control={<Radio />} label="Format B" />
              </RadioGroup>
            </Grid>
          </FormControl>

          <FormControl>
            <FormLabel>Scanning</FormLabel>
            <Grid>
              <RadioGroup defaultValue="sample1">
                <FormControlLabel value="sample1" control={<Radio />} label="Scan Manually" />
                <FormControlLabel value="sample" control={<Radio />} label="Scan When Complete" />
              </RadioGroup>
            </Grid>
          </FormControl>

          <FormControl>
            <FormLabel>Payment Methods</FormLabel>
            <Grid>
              <FormGroup>
                <FormControlLabel control={<Checkbox value="cash" defaultChecked />} label="Cash" />
                <FormControlLabel control={<Checkbox value="creditCard" />} label="Credit Card" />
                <FormControlLabel control={<Checkbox value="comp" />} label="Comp" />
              </FormGroup>
            </Grid>
          </FormControl>

          <FormControl>
            <FormLabel>Ticket Display</FormLabel>
            <Grid>
              <FormGroup>
                <FormControlLabel control={<Checkbox value="leftInAllotment" defaultChecked />} label="Left In Allotment" />
                <FormControlLabel control={<Checkbox value="soldOut" defaultChecked />} label="Sold Out" />
              </FormGroup>
            </Grid>
          </FormControl>

          <FormControl>
            <FormLabel>Customer Info</FormLabel>
            <Grid>
              <FormGroup defaultValue="sample">
                <FormControlLabel value="sample" control={<Checkbox />} label="Active" />
                <FormControlLabel value="sample" control={<Checkbox />} label="Basic Info" />
                <FormControlLabel value="sample" control={<Checkbox />} label="Address Info" />
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

export default FormUpdateTickets;
