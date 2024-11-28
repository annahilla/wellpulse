import { NavLink } from "react-router";

const Navbar = () => {
    return (
        <nav className="py-10 flex justify-between items-center">
            <div className="logo">
                <h3 className="text-xl">WellPulse</h3>
            </div>
            <ul className="flex justify-between items-center gap-20 uppercase">
                <li className="cursor-pointer hover:border-b-2 hover:border-green">
                    <NavLink to="/" className={({ isActive }) => isActive ? "font-semibold" : ""}>Home</NavLink>
                </li>
                <li className="cursor-pointer hover:border-b-2 hover:border-green">
                    <NavLink to="/map" className={({ isActive }) => isActive ? "font-semibold" : ""}>Map</NavLink>
                </li>
                <li className="cursor-pointer hover:border-b-2 hover:border-green">
                    <NavLink to="/calendar" className={({ isActive }) => isActive ? "font-semibold" : ""}>Calendar</NavLink>
                </li>
                <li className="cursor-pointer hover:border-b-2 hover:border-green">
                    <NavLink to="/progress" className={({ isActive }) => isActive ? "font-semibold" : ""}>Progress</NavLink>
                </li>
                <li>
                    <button className="px-5 py-2 rounded-md text-white bg-green hover:opacity-90">Log In</button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;