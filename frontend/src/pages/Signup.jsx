import React, { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import zentask_i from "@/assets/zentask_i.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      register(data.token);

      localStorage.setItem("token", data.token);
      console.log("User registered:", data);
      toast.success("User registered successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div
            className="flex
                     items-center justify-between"
          >
            <CardTitle className=" flex items-center justify-between ">
              <img
                src={zentask_i}
                alt="ZenTask Logo"
                className=" max-w-30 h-auto"
              />
            </CardTitle>
            <CardAction className="flex items-center justify-center">
              <Link to="/login">
                <Button
                  variant="link"
                  className="cursor-pointer text-blue-500 "
                >
                  Sign In
                </Button>
              </Link>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent>
          <form className=" flex flex-col gap-6" onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <CardFooter className="flex-col px-0 gap-2">
              <Button
                type="submit"
                className="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}{" "}
              </Button>
              <Button variant="outline" className="w-full cursor-pointer">
                Signup with Google
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default Signup;
