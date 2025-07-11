import { useDocumentTitle } from "@/hooks";
import { Outlet } from "react-router-dom";
import logo from "@/assets/icon.svg";
import fd from "@/assets/images/fd_dark.svg";

export default function AuthLayout() {
  useDocumentTitle();
  return (
    <div className="grid min-h-svh lg:grid-cols-1 bg-[url(/src/assets/images/pattern.svg)] bg-center bg-repeat bg-opacity-5">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <img className="rounded-md" src={logo} alt="fs-logo" />
            </div>
            FoodStation.LK
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
        <div className="flex justify-center gap-2 md:justify-center">
          <a
            href="https://focaldive.io"
            className="flex items-center gap-2 font-medium"
          >
            <span className="text-[10px]  text-gray-400 uppercase tracking-widest">
              Powered By
            </span>
            <div className="">
              <img className="rounded-md" src={fd} alt="fs-logo" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
