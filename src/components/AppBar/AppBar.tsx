import { useEffect, useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Account from "@mui/icons-material/AccountCircle";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";

import { auth, provider } from "../../config";

export const AppBar = () => {
  const [authenticated, setAuthenticated] = useState<boolean>();

  useEffect(() => {
    const authStartup = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      });
    };

    authStartup();
  }, []);

  const login = () => signInWithRedirect(auth, provider);
  const logout = () => signOut(auth);

  return (
    <MuiAppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link
          component={RouterLink}
          to="/sessions"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          <Typography variant="h6" component="div">
            Archery
          </Typography>
        </Link>
        {authenticated === true && (
          <Button onClick={logout} color="inherit">
            <Account />
          </Button>
        )}
        {authenticated === false && (
          <Button onClick={login} color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};
