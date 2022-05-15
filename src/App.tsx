import { Box, Container, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { NavBar } from "./components";

function App() {
  return (
    <Flex
      direction="column"
      style={{ backgroundColor: "lightgray", height: "100vh" }}
    >
      <NavBar />
      <Container maxWidth="4xl" flex={1}>
        <Box p="4" style={{ backgroundColor: "white", height: "100%" }}>
          <Outlet />
        </Box>
      </Container>
    </Flex>
  );
}

export default App;
