import { useNavigate } from "react-router-dom";

interface BlogInput {
  title: string;
  content: string;
  name: string;
  edit: boolean;
  id: string;
}

export default function Blog({ id, title, content, name, edit }: BlogInput) {
  const navigate = useNavigate();
  const truncatedContent =
    content.length > 100 ? content.substring(0, 100) + "..." : content;

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/blog/edit/${id}`);
  };
  return (
    <>
      <div className="flex flex-col items-start">
        <div className="flex justify-between w-full">
          <h2 className="text-2xl mb-2 font-semibold">{title}</h2>
          {edit && (
            <button
              onClick={handleEdit}
              className="bg-blue-400 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          )}
        </div>
        {name && (
          <div className="flex justify-end ml-2 w-full">
            <div className="bg-green-200 rounded-full  h-6 w-6 flex items-center justify-center text-sm font-semibold">
              {name[0].toLocaleUpperCase()}
            </div>
            <span className=" ml-3">{name}</span>
          </div>
        )}
        <div className="flex justify-end w-full">
          {!name && <span>No name</span>}
        </div>
      </div>
      <p className="mt-4 text-gray-700">{truncatedContent}</p>
      <hr />
    </>
  );
}
