import { logout } from "../config/firebase";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BottomNavigation
      showLabels
      sx={{ bgcolor: "#69c1f7", justifyContent: "flex-end" }}
    >
      <BottomNavigationAction
        label="Logout"
        onClick={handleLogout}
        sx={{ color: "#ffff" }}
        icon={<LogoutIcon sx={{ color: "#ffff" }} />}
      />
    </BottomNavigation>
  );
};

export default Navbar;
