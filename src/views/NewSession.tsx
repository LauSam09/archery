import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { Face, Unit } from "../models";
import { db } from "../config";

export const NewSession = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-expect-error
    const face = e.target[0].value;
    // @ts-expect-error
    const distance = e.target[2].value;
    // @ts-expect-error
    const distanceUnit = e.target[4].value;
    // @ts-expect-error
    const arrowsPerEnd = e.target[6].value;

    if (isNaN(distance) || isNaN(arrowsPerEnd)) {
      return;
    }

    const docRef = await addDoc(collection(db, "sessions"), {
      face,
      distance: +distance,
      distanceUnit,
      arrowsPerEnd: +arrowsPerEnd,
      sessionTimestamp: serverTimestamp(),
    });

    navigate(`../${docRef.id}/active`);
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{ "> *  ": { marginBottom: "10px !important" } }}
    >
      <Typography variant="h4">New Session</Typography>
      <FormControl fullWidth>
        <InputLabel>Face</InputLabel>
        <Select label="Face" defaultValue={Face.Single122}>
          <MenuItem value={Face.Single122}>122</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        type="number"
        label="Distance"
        defaultValue={30}
        inputProps={{ min: 0, max: 100, step: 10 }}
      />
      <FormControl fullWidth>
        <InputLabel>Distance unit</InputLabel>
        <Select label="Distance unit" defaultValue={Unit.Yards}>
          <MenuItem value={Unit.Yards}>Yards</MenuItem>
          <MenuItem value={Unit.Metres}>Metres</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Arrows per end</InputLabel>
        <Select label="Arrows per end" defaultValue={6}>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>
      <div>
        <Button type="submit" fullWidth size="large" variant="contained">
          Start
        </Button>
      </div>
    </Box>
  );
};
