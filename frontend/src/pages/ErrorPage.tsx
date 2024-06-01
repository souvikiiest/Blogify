import { Link } from "react-router-dom";

interface ErrorPageProps {
  label?: string;
}
export default function ErrorPage({ label }: ErrorPageProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-2xl font-semibold mb-8">
          {label ? label : "Page Not Found"}
        </p>
        <Link
          to="/signin"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Go Home
        </Link>
      </div>
    </>
  );
}
