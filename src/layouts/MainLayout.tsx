import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen px-10 lg:px-20">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
