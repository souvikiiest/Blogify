import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export default function Singup() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <Auth type="signup" />
        <div className="invisible md:visible ">
          <Quote />
        </div>
      </div>
    </>
  );
}
