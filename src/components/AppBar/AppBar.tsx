import { useEffect, useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Account from "@mui/icons-material/AccountCircle";
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
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Archery
        </Typography>
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
