import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon, LatLngExpression, LatLngTuple } from "leaflet";
import { RiTreeLine } from "react-icons/ri";
import { IoIosCafe } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { RiCommunityLine } from "react-icons/ri";
import ReactDOMServer from "react-dom/server";

type Category = "parks" | "cafes" | "gyms" | "civicCenters";

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
};

const icons = {
  parks: divIcon({
    html: ReactDOMServer.renderToString(
      <div className="bg-green rounded-full w-6 h-6 flex items-center justify-center border border-2 border-white">
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
};

const MapPage = () => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {Object.entries(locations).map(([category, places]) =>
        places.map((place, index) => (
          <Marker
            key={index}
            position={place.position}
            icon={icons[category as Category]}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
};

export default MapPage;
