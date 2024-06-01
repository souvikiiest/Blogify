import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";

const useBlogForm = (setValue: (name: string, value: any) => void) => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) setIsEditMode(true);
    async function fetchBlog() {
      const auth = localStorage.getItem("token");
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            authorization: auth,
          },
        });
        const blogData = response.data;
        setValue("title", blogData.title);
        setValue("content", blogData.content);
      } catch (err) {
        console.log(err);
        toast.error("Error fetching blog");
      }
    }
    if (isEditMode) {
      fetchBlog();
    }
  }, [id, setValue, isEditMode]);

  async function onSubmitHandler(data: FormData) {
    console.log(data);
    const auth = localStorage.getItem("token");
    let response;
    try {
      if (isEditMode) {
        response = await axios.put(
          `${BACKEND_URL}/api/v1/blog/edit/${id}`,
          data,
          {
            headers: {
              authorization: auth,
            },
          }
        );
      } else {
        response = await axios.post(`${BACKEND_URL}/api/v1/blog/add`, data, {
          headers: {
            authorization: auth,
          },
        });
      }
      console.log(response);
      if (response) {
        toast.success(
          isEditMode && !isDeleteMode
            ? "Blog updated successfully"
            : "Blog uploaded successfully"
        );
        navigate("/blog");
      }
    } catch (err: any) {
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

  async function handleDelete() {
    setIsDeleteMode(true);
    const auth = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/blog/delete/${id}`,
        {
          headers: {
            authorization: auth,
          },
        }
      );
      if (response) {
        toast.success("Your Blog was deleted successfully");
        navigate("/blog");
      }
    } catch (err: any) {
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
  return {
    isEditMode,
    isDeleteMode,
    onSubmitHandler,
    handleDelete,
  };
};
export default useBlogForm;
