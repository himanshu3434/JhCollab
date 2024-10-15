import ChoiceRoom from "@/components/ChoiceRoom";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="h-screen flex  justify-center items-center ">
      <div className=" bg-sky-500 p-5 rounded-lg">
        <div>
          <ChoiceRoom />
        </div>
      </div>
    </div>
  );
}
