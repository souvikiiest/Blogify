import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Blog from "../components/Blog";
import NavBar from "../components/Navbar";
import { BACKEND_URL } from "../config";
import NotAuthPage from "./NotAuth";

interface MyBlogtype {
  id: string;
  title: string;
  content: string;
  edit: boolean;
  author: {
    name: string;
  };
}

export default function MyBlog() {
  const [myBlog, setMyBlog] = useState<MyBlogtype[]>([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function getMyBlogs() {
      try {
        const response = await axios.get<MyBlogtype[]>(
          `${BACKEND_URL}/api/v1/blog/myblogs`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.data) setMyBlog(response.data);
      } catch (err) {
        toast.error("Error occured while fetching blogs");
      }
    }
    getMyBlogs();
  }, [token]);
  if (!token) return <NotAuthPage />;
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center px-4">
        <h1 className="text-4xl font-bold my-8 text-center">My Blogs</h1>
        <div className="grid grid-cols-1 m-4">
          {myBlog.length > 0 ? (
            myBlog.map((blog, index) => (
              <Link className="pt-4" key={index} to={`/blog/${blog.id}`}>
                <Blog
                  id={blog.id}
                  title={blog.title}
                  content={blog.content}
                  name={blog.author.name}
                  edit={true}
                />
              </Link>
            ))
          ) : (
            <span>No Blog present, upload one now</span>
          )}
        </div>
      </div>
    </>
  );
}
