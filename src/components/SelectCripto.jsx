import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { FormHelperText } from "@mui/material";

export default function SelectCripto({ label, optionsApi, setCripto, error }) {
  const [state, setState] = useState("");

  const handleChange = (event) => {
    setState(event.target.value);
    setCripto(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, p: 1, mb: 4 }}>
      <FormControl fullWidth error={error}>
        <InputLabel>{label}</InputLabel>
        <Select value={state} label={label} onChange={handleChange}>
          {optionsApi?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>Campo obligatorio *</FormHelperText>}
      </FormControl>
    </Box>
  );
}
