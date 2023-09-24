import { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { DashbaordIcon, TransactionsIcon, UserAccountIcon } from "../../Assets/Icons/Icons";
import "./FooterStyles.css";

export default function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setValue(0);
    } else if (location.pathname === "/transactions") {
      setValue(1);
    } else if (location.pathname === "/account") {
      setValue(2);
    } else {
      setValue(4);
    }
  }, [location]);

  if (location.pathname !== "/login") {
    return (
      <Box className='mobileMenuContainer'>
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={20}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            className='footerIconsContainer'>
            <BottomNavigationAction icon={<DashbaordIcon isSelected={location.pathname === "/" ? true : false} />} style={{ color: "#00ff00" }} label='Dashboard' onClick={() => navigate("/")} />
            <BottomNavigationAction icon={<TransactionsIcon isSelected={location.pathname === "/transactions" ? true : false} />} label='Transactions' onClick={() => navigate("/transactions")} />
            <BottomNavigationAction icon={<UserAccountIcon isSelected={location.pathname === "/account" ? true : false} />} label='Account' onClick={() => navigate("/account")} />
          </BottomNavigation>
        </Paper>
      </Box>
    );
  } else {
    return null;
  }
}
