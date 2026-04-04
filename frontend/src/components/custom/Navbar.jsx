import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext.jsx";
import { toast } from "sonner";
import { TaskContext } from "@/context/TaskContext";
import zentask_i from "@/assets/zentask_i.png";
import { motion, AnimatePresence } from "framer-motion";

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
    <nav className="w-full border-b  px-5 md:px-10 lg:px-15">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Logo */}
        <div className=" w-25 md:w-30 lg:w-35  flex items-center overflow-hidden">
          <Link to="/" className="flex items-center">
            <img
              src={zentask_i}
              alt="ZenTask Logo"
              className="h-full w-auto object-contain scale-110"
            />
          </Link>
        </div>
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5">
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
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-16 left-0 w-full z-50"
          >
            <div className="flex flex-col border-t bg-background px-4 py-4 space-y-4">
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/important"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Important
              </NavLink>

              <NavLink
                to="/completedTask"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Completed
              </NavLink>

              <NavLink
                to="/inProgressTasks"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                In Progress
              </NavLink>

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 text-left"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
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
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
