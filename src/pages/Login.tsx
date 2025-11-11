import { useState, useRef } from "react";
import { loginUser } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // ☼ Validate Email
    if (!email) {
      emailRef.current?.focus();
      setError("Email is required");
      return;
    }

    // ☼ Validate Password
    if (!password) {
      passwordRef.current?.focus();
      setError("Password is required");
      return;
    }

    // ☼ Attempt login
    const ok = loginUser(email, password);

    if (!ok) {
      setError("Invalid email or password");
      return;
    }

    // ☼ Success → navigate
    navigate("/profile");
  }

  return (
    <div className="flex justify-center items-center min-h-dvh md:min-h-screen w-full bg-[#0d1117] text-white overflow-hidden">
      <form
        onSubmit={handleLogin}
        className="login-form flex flex-col items-center gap-[0.8rem] p-2"
      >
        <h2 className="whitespace-nowrap text-xl mb-3">
          Sign in to Demo Application
        </h2>
        {/* Email Field */}
        <div className="flex flex-col w-full">
          <label htmlFor="user-email">
            Email address<sup>*</sup>
          </label>
          <input
            ref={emailRef}
            id="user-email"
            className="border border-gray-600 rounded-lg py-2 px-2"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password Field */}
        <div className="flex flex-col w-full">
          <label htmlFor="user-password">
            Enter Password<sup>*</sup>
          </label>
          <input
            ref={passwordRef}
            id="user-password"
            className="border border-gray-600 rounded-lg py-2 px-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Submit Button */}
        <button
          className="w-full rounded-lg bg-[#238636] text-white py-2 whitespace-nowrap"
          type="submit"
        >
          Login
        </button>
        <p
          className={`text-red-600 font-medium ${
            error === "" ? "invisible" : "visible"
          }`}
        >
          Error: {error}
        </p>
        <Link to="/register">No account? Register</Link>
      </form>
    </div>
  );
}
