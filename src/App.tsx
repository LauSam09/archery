import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

import { AppBar } from "./components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Sessions } from "./views";

export default function App() {
  return (
    <BrowserRouter>
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
          <Paper sx={{ padding: "20px" }}>
            <Routes>
              <Route path="/sessions" element={<Sessions />} />
              <Route path="*" element={<Navigate to="/sessions" />} />
            </Routes>
          </Paper>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
