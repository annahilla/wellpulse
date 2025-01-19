import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon, LatLngExpression, LatLngTuple } from "leaflet";
import { RiTreeLine } from "react-icons/ri";
import { IoIosCafe } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { RiCommunityLine } from "react-icons/ri";
import { GiHiking, GiMeal } from "react-icons/gi";
import { FaBook, FaPaintBrush, FaSpa } from "react-icons/fa";
import { FaBusinessTime } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import ReactDOMServer from "react-dom/server";
import { LocationCategory } from "../../types/types";
import { useEffect } from "react";
import { useTypedSelector } from "../Calendar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getLocations } from "../../redux/locationsActions";

const position: LatLngExpression = [41.3874, 2.1686];

const MapPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { locations } = useTypedSelector((state) => state.locations);

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  const icons = {
    parks: divIcon({
      html: ReactDOMServer.renderToString(
        <div className="bg-lime-500 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
          <RiTreeLine size={16} color="white" />
        </div>
      ),
      className: "icon-container",
      iconSize: [30, 30],
    }),
    cafes: divIcon({
      html: ReactDOMServer.renderToString(
        <div className="bg-orange rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
          <IoIosCafe size={16} color="white" />
        </div>
      ),
      className: "icon-container",
      iconSize: [30, 30],
    }),
    gyms: divIcon({
      html: ReactDOMServer.renderToString(
        <div className="bg-lime-600 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
          <CgGym size={16} color="white" />
        </div>
      ),
      className: "icon-container",
      iconSize: [30, 30],
    }),
    civicCenters: divIcon({
      html: ReactDOMServer.renderToString(
        <div className="bg-rose-700 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
          <RiCommunityLine size={16} color="white" />
        </div>
      ),
      className: "icon-container",
      iconSize: [30, 30],
    }),
    healthyRestaurants: divIcon({
      html: ReactDOMServer.renderToString(
        <div className="bg-green rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
          <GiMeal size={16} color="white" />
        </div>
      ),
      className: "icon-container",
      iconSize: [30, 30],
    }),
    relaxZones: divIcon({
      html: ReactDOMServer.renderToString(
        <div className="bg-rose-400 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
          <FaSpa size={16} color="white" />
        </div>
      ),
      className: "icon-container",
      iconSize: [30, 30],
    }),
    coworking: divIcon({
      html: ReactDOMServer.renderToString(
        <div className="bg-indigo-500 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
          <FaBusinessTime size={16} color="white" />
        </div>
      ),
      className: "icon-container",
      iconSize: [30, 30],
    }),
    outdoorSports: divIcon({
      html: ReactDOMServer.renderToString(
        <div className="bg-yellow rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
          <GiRunningShoe size={16} color="white" />
        </div>
      ),
      className: "icon-container",
      iconSize: [30, 30],
    }),
    libraries: divIcon({
      html: ReactDOMServer.renderToString(
        <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
          <FaBook size={16} color="white" />
        </div>
      ),
      className: "icon-container",
      iconSize: [30, 30],
    }),
    hikingRoutes: divIcon({
      html: ReactDOMServer.renderToString(
        <div className="bg-amber-700 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
          <GiHiking size={16} color="white" />
        </div>
      ),
      className: "icon-container",
      iconSize: [30, 30],
    }),
    craftWorkshops: divIcon({
      html: ReactDOMServer.renderToString(
        <div className="bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
          <FaPaintBrush size={16} color="white" />
        </div>
      ),
      className: "icon-container",
      iconSize: [30, 30],
    }),
  };

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {locations.map((place, index) => (
        <Marker
          key={index}
          position={place.position as LatLngTuple}
          icon={icons[place.category as LocationCategory]}
        >
          <Popup>{place.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapPage;
