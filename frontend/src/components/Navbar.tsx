import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <>
      <nav className="bg-grey-300 shadow-lg">
        <div className="flex justify-between items-center">
          <Link to={"/blog"}>
            {" "}
            <div className="text-2xl font-bold ml-4 ">BLOGIFY</div>{" "}
          </Link>
          <div>
            <button
              onClick={() => navigate("/addBlog")}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2 my-1"
            >
              Add
            </button>
            <button
              onClick={() => navigate("/myblogs")}
              className="bg-blue-500 text-white px-4 py-2 mr-2 rounded my-1"
            >
              My Blogs
            </button>
            <button
              onClick={handleLogout}
              className=" bg-red-500 text-white mr-4 px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            >
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
