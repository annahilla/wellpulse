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

const position: LatLngExpression = [41.3874, 2.1686];

const locations = {
  parks: [
    {
      name: "Parc de la Ciutadella",
      position: [41.3833, 2.185] as LatLngTuple,
    },
    { name: "Parc de Joan Miró", position: [41.3679, 2.1533] as LatLngTuple },
  ],
  cafes: [
    { name: "Cafè de la Pedrera", position: [41.3954, 2.1615] as LatLngTuple },
    { name: "Cafè El Magnífico", position: [41.3875, 2.1706] as LatLngTuple },
  ],
  gyms: [
    { name: "Dir Diagonal", position: [41.3983, 2.1408] as LatLngTuple },
    { name: "Fitter Club", position: [41.391, 2.164] as LatLngTuple },
  ],
  civicCenters: [
    { name: "Centre Cívic Urgell", position: [41.3808, 2.1565] as LatLngTuple },
    {
      name: "Centre Cívic Sagrada Família",
      position: [41.404, 2.181] as LatLngTuple,
    },
  ],
  healthyRestaurants: [
    { name: "Teresa Carles", position: [41.3945, 2.1708] as LatLngTuple },
    { name: "Flax & Kale", position: [41.3904, 2.1649] as LatLngTuple },
  ],
  relaxZones: [
    { name: "AIRE Barcelona", position: [41.38, 2.1833] as LatLngTuple },
    {
      name: "Spa Hammam Rituels d'Orient",
      position: [41.3808, 2.1692] as LatLngTuple,
    },
  ],
  coworking: [
    { name: "Betahaus", position: [41.389, 2.173] as LatLngTuple },
    { name: "Cloudworks", position: [41.3961, 2.175] as LatLngTuple },
  ],
  outdoorSports: [
    {
      name: "Pista de Tennis Olímpica",
      position: [41.3753, 2.1744] as LatLngTuple,
    },
    { name: "Bosc de les Creus", position: [41.383, 2.1795] as LatLngTuple },
  ],
  libraries: [
    {
      name: "Biblioteca de Catalunya",
      position: [41.3879, 2.1744] as LatLngTuple,
    },
    {
      name: "Biblioteca Sagrada Família - Josep M. Ainaud de Lasarte",
      position: [41.405, 2.1836] as LatLngTuple,
    },
  ],
  hikingRoutes: [
    { name: "Montjuïc", position: [41.3685, 2.1657] as LatLngTuple },
    { name: "Collserola", position: [41.4092, 2.1217] as LatLngTuple },
  ],
  craftWorkshops: [
    {
      name: "Taller de Ceràmica La Roca",
      position: [41.3976, 2.1664] as LatLngTuple,
    },
    {
      name: "Taller de Pintura L'Atelier",
      position: [41.3802, 2.1745] as LatLngTuple,
    },
  ],
};

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

const MapPage = () => {
  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {Object.entries(locations).map(([category, places]) =>
        places.map((place, index) => (
          <Marker
            key={index}
            position={place.position}
            icon={icons[category as LocationCategory]}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
};

export default MapPage;
