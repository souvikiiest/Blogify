import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Blog from "../components/Blog";
import LoadingSpinner from "../components/Loading";
import NavBar from "../components/Navbar";
import { BACKEND_URL } from "../config";
import NotAuthPage from "./NotAuth";

interface BlogType {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
}
export default function HomePage() {
  const auth = localStorage.getItem("token");

  const [blogs, setBlogs] = useState<BlogType[]>([]);
  useEffect(() => {
    async function getBlogs() {
      try {
        const response = await axios.get<BlogType[]>(
          `${BACKEND_URL}/api/v1/blog/bulk`,
          {
            headers: {
              authorization: auth,
            },
          }
        );

        const updatedBlog = await Promise.all(
          response.data.map(async (res) => {
            const authorDetails = await getAuthorDetails(res.authorId);
            return { ...res, authorName: authorDetails.name };
          })
        );
        setBlogs(updatedBlog);
      } catch (err: any) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.msg)
          toast.error(err.response.data.msg, {
            theme: "light",
          });
        else
          toast.error("An unexpected error occured", {
            theme: "light",
          });
      }
    }
    getBlogs();
  }, [auth]);
  const getAuthorDetails = async (id: string) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/user/getauthor/${id}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  if (!auth) return <NotAuthPage />;
  if (blogs.length < 1)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-screen-md  px-4">
          <h1 className="text-4xl font-bold my-8 text-center">
            Blog Home Page
          </h1>
          <div className="grid grid-cols-1">
            {blogs.map((blog, index) => (
              <Link className="pt-4" key={index} to={`/blog/${blog.id}`}>
                <Blog
                  id={blog.id}
                  title={blog.title}
                  content={blog.content}
                  name={blog.authorName}
                  edit={false}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
