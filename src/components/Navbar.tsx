import { NavLink } from "react-router";
import Button from "./ui/Button";
import logo from "../assets/logo.png";
import NavItem from "./ui/NavItem";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative py-10 flex justify-between items-center">
      <NavLink to="/" className="flex items-center justify-center gap-3">
        <img className="h-8" src={logo} alt="WellPulse logo" />
        <h3 className="text-xl lg:text-2xl uppercase">WellPulse</h3>
      </NavLink>

      <div className="">
        <button onClick={toggleMenu} className="md:hidden">
          <AiOutlineMenu size={27} />
        </button>

        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } flex py-10 absolute uppercase top-20 left-0 bg-white w-full flex-col justify-between items-center gap-10 md:bg-transparent md:py-0 md:w-auto md:flex md:flex-row xl:gap-20 md:relative md:top-0 md:left-0`}
        >
          <li className="cursor-pointer hover:animate-pulse">
            <NavItem to="/map">Map</NavItem>
          </li>
          <li className="cursor-pointer hover:animate-pulse">
            <NavItem to="/calendar">Calendar</NavItem>
          </li>
          <li className="cursor-pointer hover:animate-pulse">
            <NavItem to="/progress">Progress</NavItem>
          </li>
          <li className="flex items-center justify-between gap-5 md">
            <Button type="primary" buttonSize="sm" textSize="text-md">
              Log In
            </Button>
            <Button type="secondary" buttonSize="sm" textSize="text-md">
              Sign Up
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
