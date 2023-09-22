import { logout } from "../config/firebase";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <button className="btn btn-warning" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
