import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

import { AppBar } from "./components";

export default function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar />
      <Box
        sx={{
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
        }}
      >
        <Paper sx={{ padding: "20px" }}>TODO</Paper>
      </Box>
    </Box>
  );
}
