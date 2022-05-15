import { Box, Container, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav style={{ backgroundColor: "gold" }}>
      <Container maxWidth="4xl">
        <Flex alignItems="center">
          <Box p="4">
            {" "}
            <Link as={RouterLink} to="/">
              <Text fontSize="xl">Archery Scorer</Text>
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
