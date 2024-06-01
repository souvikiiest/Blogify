import { useForm } from "react-hook-form";
import NavBar from "../components/Navbar";
import useBlogForm from "../hooks/useBlogForm";
import NotAuthPage from "./NotAuth";

export default function NewBlog() {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();
  const auth = localStorage.getItem("token");
  const { isEditMode, onSubmitHandler, handleDelete } = useBlogForm(setValue);
  if (!auth) return <NotAuthPage />;
  return (
    <>
      <NavBar />
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col space-y-4 w-full max-w-md mx-auto"
      >
        <label htmlFor="title" className="text-lg font-semibold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="rounded px-3 py-2 border border-gray-300"
          {...register("title", { required: true })}
          placeholder="Enter title"
        />
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}
        <label htmlFor="content" className="text-lg font-semibold">
          Content:
        </label>
        <textarea
          id="content"
          rows={4}
          className="rounded px-3 py-2 border border-gray-300 resize-none"
          {...register("content", { required: true })}
          placeholder="Enter content"
        />
        {errors.content && (
          <span className="text-red-500">Content is required</span>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Publish
        </button>
        {isEditMode && (
          <button
            onClick={handleDelete}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
        )}
      </form>
    </>
  );
}
