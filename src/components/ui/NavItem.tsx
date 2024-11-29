import { NavLink } from "react-router";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem = ({ children, to }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "font-semibold" : "")}
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
