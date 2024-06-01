import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export default function Signin() {
  return (
    <>
      <div className="md:grid grid-cols-2 min-h-screen">
        <Auth type="signin" />
        <div className="invisible md:visible ">
          <Quote />
        </div>
      </div>
    </>
  );
}
