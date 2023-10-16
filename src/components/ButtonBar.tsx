import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useStore from "@/utils/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ButtonBar() {
  const { user, token } = useStore();
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (user && token) setIsAuth(true);
  }, [token, user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            <Button
              href="/movies"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Movies
            </Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              href="/series"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Series
            </Button>
          </Typography>

          {isAuth ? (
            <Button onClick={() => router.push("/profile")} color="inherit">
              Profile
            </Button>
          ) : (
            <Button onClick={() => router.push("/login")} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
