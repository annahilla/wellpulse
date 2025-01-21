import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { LocationCategory, LocationInterface } from "../../types/types";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../Calendar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getLocations } from "../../redux/locationsActions";
import { Link } from "react-router";
import Button from "../../components/ui/Button";
import { mapIcons } from "../../utils/mapIcons";

const position: LatLngExpression = [41.3874, 2.1686];

interface MapComponentProps {
  selectLocation: (place: LocationInterface) => void;
}

const MapComponent = ({ selectLocation }: MapComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { locations } = useTypedSelector((state) => state.locations);
  const [selectedPlace, setSelectedPlace] = useState<LocationInterface | null>(
    null
  );

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

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
          icon={mapIcons[place.category as LocationCategory]}
        >
          <Popup>
            <Link
              target="_blank"
              to={place.website}
              className="font-bold text-lg"
            >
              {place.name}
            </Link>
            <div className="flex items-start justify-start gap-2">
              <p className="font-bold">Direction:</p>
              <p>{place.direction}</p>
            </div>
            <div className="flex justify-center">
              <Button
                textSize="text-md"
                size="sm"
                type={
                  selectedPlace?.name === place.name ? "secondary" : "primary"
                }
                isDisabled={false}
                handleClick={() => {
                  selectLocation(place);
                  setSelectedPlace(place);
                }}
              >
                {selectedPlace?.name === place.name ? "Selected" : "Select"}
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
