import { useState } from "react";
import { getLoggedUser, updateLoggedUser, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import type { User } from "../utils/auth.ts";
import MenuLogo from "../assets/Menu.svg?react";
import CloseBtnLogo from "../assets/close-icon.svg?react";
import LogoutLogo from "../assets/log-out.svg?react";

export default function Profile() {
  const user = getLoggedUser() as User;
  // const [email, setEmail] = useState(user.email);
  const email = user.email;
  const [password, setPassword] = useState(user.password);
  const [username, setUsername] = useState(user.username);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();

  function saveChanges() {
    updateLoggedUser({ email, password, username });
    alert("Updated successfully!");
  }

  function logout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <div className="flex h-screen md:overflow-hidden bg-[#23272f] text-white relative lg:static">
      <button
        type="button"
        onClick={() => {
          setIsSidebarVisible((prev) => !prev);
          console.log(isSidebarVisible);
        }}
        className="absolute top-1 left-2 z-50 lg:hidden"
      >
        <MenuLogo />
      </button>
      <aside
        className={`w-fit flex-none md:w-54 flex flex-col items-baseline lg:border lg:border-gray-600 p-5 pt-8 lg:pt-5 gap-3 absolute h-full lg:static z-999 bg-[#0d1117] lg:bg-inherit ${
          isSidebarVisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        } lg:translate-0 transition-all ease-in-out duration-300 lg:transition-none lg:opacity-100`}
      >
        <button
          type="button"
          onClick={() => {
            setIsSidebarVisible((prev) => !prev);
            console.log(isSidebarVisible);
          }}
          className="absolute top-2 right-3 lg:hidden"
        >
          <CloseBtnLogo />
        </button>
        <h2>Your Account Details:</h2>

        <input
          className="w-full"
          value={email.slice(0, email.indexOf("@"))}
          disabled
        />

        <input
          className="w-fit"
          type={isPasswordVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => {
            setIsPasswordVisible((prev) => !prev);
          }}
        >
          {isPasswordVisible ? "Hide Password" : "Show Password"}
        </button>
        <input
          className="w-fit"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={() => {
            saveChanges();
            window.location.reload();
          }}
        >
          Save Changes
        </button>
        <button className="flex gap-1 items-center" onClick={logout}>
          <LogoutLogo />
          Logout
        </button>
      </aside>
      <main className="grow p-6 md:overflow-y-auto md:p-5">
        <h2 className="p-3 lg:p-0">Welcome {username},</h2>
      </main>
    </div>
  );
}
