import { useNavigate } from "react-router";

const SideNavBar = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/signin");
  };
  return (
    <div class="menu">
      <ul class="menu-content">
        <li>
          <a href="#">
            <span class="material-symbols-outlined">home</span>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="material-symbols-outlined">dashboard</span>
            <span>DashBoard</span>
          </a>
        </li>
        {/* <li>
          <a href="#">
            <span class="material-symbols-outlined">explore</span>
            <span>Explore</span>
          </a>
        </li> */}
        {/* <li>
          <a href="#">
            <span class="material-symbols-outlined">analytics</span>
            <span>Analytics</span>
          </a>
        </li> */}
        {/* <li>
          <a href="#">
            <span class="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
        </li> */}
        <li>
          <a href="#">
            <span class="material-symbols-outlined">person</span>
            <span>Account</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="material-symbols-outlined">report</span>
            <span>Report</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="material-symbols-outlined">email</span>
            <span>Contact</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="material-symbols-outlined">logout</span>
            <span onClick={logout}>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
export default SideNavBar;
