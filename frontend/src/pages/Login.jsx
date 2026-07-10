import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext"; // ✅ import TaskContext
import { Loader2 } from "lucide-react";
import zentask_i from "@/assets/zentask_i.png";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { setUserToken } = useContext(TaskContext); // ✅ get context function

  const navigate = useNavigate();

  // handle google login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/google`,
        {
          credential: credentialResponse.credential,
        },
      );

      login(res.data.token);
      setUserToken?.(res.data.token); // safe check if exists

      localStorage.setItem("token", res.data.token);

      toast.success("User Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      console.log(error);

      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token); // ✅ AuthContext login
      setUserToken(data.token); // ✅ TaskContext fetches tasks immediately

      toast.success("User Logged in successfully!");
      navigate("/"); // redirect to dashboard
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <div
            className="flex
           items-center justify-between"
          >
            <CardTitle className=" flex items-center justify-between ">
              <img
                src={zentask_i}
                alt="ZenTask Logo"
                className=" w-25 md:w-30 lg:w-35"
              />
            </CardTitle>
            <CardAction className="flex items-center justify-center">
              <Link to="/signup">
                <Button
                  variant="link"
                  className="cursor-pointer text-blue-500 "
                >
                  Sign Up
                </Button>
              </Link>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:underline float-right"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 px-0">
              <Button
                type="submit"
                className="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-600 py-1 px-2 sm:py-2 sm:px-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              {/* google login button*/}
              <div className="group mt-2 relative w-full rounded-lg">
                <div className="absolute inset-0 opacity-0 z-10">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => toast.error("Google Login Failed")}
                  />
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-1 text-sm py-1 px-2 sm:py-1.5 sm:px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium transition-all duration-300 hover:bg-gray-50 hover:shadow-md hover:border-gray-400"
                >
                  <FcGoogle size={22} />
                  <span>Continue with Google</span>
                </button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
