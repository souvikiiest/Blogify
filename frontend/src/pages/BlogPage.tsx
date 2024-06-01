import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/Loading";
import NavBar from "../components/Navbar";
import { BACKEND_URL } from "../config";
import NotAuthPage from "./NotAuth";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
}
export default function BlogPage() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");
  const [blog, setBlog] = useState<Blog | null>(null);
  const { id } = useParams();

  useEffect(() => {
    async function getBlog() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          authorization: auth,
        },
      });
      setBlog(response.data);
    }
    getBlog();
  }, [id, auth]);
  if (!blog)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (!auth) return <NotAuthPage />;
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">{blog.title}</h1>
        <div className="text-gray-600 mb-4">By {blog.author}</div>
        <hr />
        <div className="mt-5 mb-8">{blog.content}</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => {
            navigate("/blog");
          }}
        >
          Back to Home
        </button>
      </div>
    </>
  );
}
