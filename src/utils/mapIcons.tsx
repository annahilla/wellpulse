import { divIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { RiTreeLine, RiCommunityLine } from "react-icons/ri";
import { IoIosCafe } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { GiHiking, GiMeal, GiRunningShoe } from "react-icons/gi";
import { FaBook, FaPaintBrush, FaSpa, FaBusinessTime } from "react-icons/fa";
import { LocationCategories } from "../types/types";

export const mapIcons = {
  [LocationCategories.Parks]: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-lime-500 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
        <RiTreeLine size={16} color="white" />
      </div>
    ),
    className: "icon-container",
    iconSize: [30, 30],
  }),
  [LocationCategories.Cafes]: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-orange rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
        <IoIosCafe size={16} color="white" />
      </div>
    ),
    className: "icon-container",
    iconSize: [30, 30],
  }),
  [LocationCategories.Gyms]: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-lime-600 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
        <CgGym size={16} color="white" />
      </div>
    ),
    className: "icon-container",
    iconSize: [30, 30],
  }),
  [LocationCategories.CivicCenters]: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-rose-700 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
        <RiCommunityLine size={16} color="white" />
      </div>
    ),
    className: "icon-container",
    iconSize: [30, 30],
  }),
  [LocationCategories.HealthyRestaurants]: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-green rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
        <GiMeal size={16} color="white" />
      </div>
    ),
    className: "icon-container",
    iconSize: [30, 30],
  }),
  [LocationCategories.RelaxZones]: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-rose-400 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
        <FaSpa size={16} color="white" />
      </div>
    ),
    className: "icon-container",
    iconSize: [30, 30],
  }),
  [LocationCategories.Coworking]: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-indigo-500 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
        <FaBusinessTime size={16} color="white" />
      </div>
    ),
    className: "icon-container",
    iconSize: [30, 30],
  }),
  [LocationCategories.OutdoorSports]: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-yellow rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
        <GiRunningShoe size={16} color="white" />
      </div>
    ),
    className: "icon-container",
    iconSize: [30, 30],
  }),
  [LocationCategories.Libraries]: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
        <FaBook size={16} color="white" />
      </div>
    ),
    className: "icon-container",
    iconSize: [30, 30],
  }),
  [LocationCategories.HikingRoutes]: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-amber-700 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
        <GiHiking size={16} color="white" />
      </div>
    ),
    className: "icon-container",
    iconSize: [30, 30],
  }),
  [LocationCategories.CraftWorkshops]: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
        <FaPaintBrush size={16} color="white" />
      </div>
    ),
    className: "icon-container",
    iconSize: [30, 30],
  }),
};
