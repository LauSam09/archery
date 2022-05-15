import { Box, Container, Flex, Link, Spacer } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav style={{ backgroundColor: "gold" }}>
      <Container maxWidth="4xl">
        <Flex>
          <Box p="4">
            {" "}
            <Link as={RouterLink} to="/">
              Archery Scorer
            </Link>
          </Box>
          <Spacer />
          <Box p="4">
            <Link as={RouterLink} to="sessions/new">
              New
            </Link>
          </Box>
          <Box p="4">
            <Link as={RouterLink} to="sessions">
              History
            </Link>
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}
