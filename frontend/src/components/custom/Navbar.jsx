import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext.jsx";
import { toast } from "sonner";
import { TaskContext } from "@/context/TaskContext";
import zentask_i from "@/assets/zentask_i.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { clearTasks } = useContext(TaskContext);

  const navigate = useNavigate();

  isLoggedIn;

  const handleLogout = () => {
    logout(); // remove token from AuthContext
    toast.success("Logged out successfully");
    clearTasks();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "text-muted-foreground hover:text-primary";

  return (
    <nav className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-3 ">
        {/* Logo */}
        <div className="w-40 h-12 flex items-center overflow-hidden">
          <Link to="/" className="flex items-center">
            <img
              src={zentask_i}
              alt="ZenTask Logo"
              className="h-full w-auto object-contain scale-110"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-5">
          <NavLink to="/" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/important" className={navLinkClass}>
            Important
          </NavLink>{" "}
          <NavLink to="/completedTask" className={navLinkClass}>
            Completed
          </NavLink>
          <NavLink to="/InProgressTasks" className={navLinkClass}>
            In Progress
          </NavLink>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="cursor-pointer"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="cursor-pointer bg-cyan-400 hover:bg-cyan-300"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="cursor-pointer">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div className="border-t bg-background px-4 py-4 space-y-4">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>

            <div className="pt-4 border-t flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
