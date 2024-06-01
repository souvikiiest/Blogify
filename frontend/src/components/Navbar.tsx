import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar.css";
export default function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const options = [
    { value: "add", label: "Add" },
    { value: "myBlogs", label: "My Blogs" },
    { value: "logout", label: "Logout" },
  ];
  const handleOptions = (option: Option) => {
    switch (option.value) {
      case "add": {
        navigate("/addBlog");
        break;
      }
      case "myBlogs": {
        navigate("/myblogs");
        break;
      }
      case "logout": {
        handleLogout();
        break;
      }
      default:
        break;
    }
  };
  return (
    <>
      <nav className="bg-grey-300 shadow-lg">
        <div className="flex justify-between items-center">
          <Link to={"/blog"}>
            {" "}
            <div className="text-2xl font-bold ml-4 ">BLOGIFY</div>{" "}
          </Link>
          <Dropdown
            options={options}
            onChange={(option: Option) => handleOptions(option)}
            placeholder="Menu"
            className="w-[20%] md:w-[10%]"
            controlClassName="dropdown-control"
            menuClassName="dropdown-menu"
            arrowClosed={<span className="arrow-closed" />}
            arrowOpen={<span className="arrow-open" />}
          />
        </div>
      </nav>
    </>
  );
}
