import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CustomSlider() {
  const [value, setValue] = useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="slider" gutterBottom>
        Slider Value: {value}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="slider"
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}%`}
      />
    </Box>
  );
}
