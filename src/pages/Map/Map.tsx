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

interface MapComponentProps {
  selectLocation?: (place: LocationInterface) => void;
  singleLocation?: LocationInterface;
position?: LatLngExpression;
}

const MapComponent = ({ selectLocation, singleLocation, position =  [41.3874, 2.1686] }: MapComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { locations } = useTypedSelector((state) => state.locations);
  const [selectedPlace, setSelectedPlace] = useState<LocationInterface | null>(
    null
  );

  useEffect(() => {
    if (!singleLocation) {
      dispatch(getLocations());
    }
  }, [dispatch]);

  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

{singleLocation ? (
        <Marker
          position={singleLocation.position as LatLngTuple}
          icon={mapIcons[singleLocation.category as LocationCategory]}
        >
          <Popup>
          <div className="flex flex-col m-3">
          <Link target="_blank" to={singleLocation.website} className="font-bold text-sm">
              {singleLocation.name}
          </Link>
              <p className="single-location">{singleLocation.direction}</p>
          </div>
          </Popup>
        </Marker>
      ) : (
        locations.map((place, index) => (
          <Marker
            key={index}
            position={place.position as LatLngTuple}
            icon={mapIcons[place.category as LocationCategory]}
          >
            <Popup>
              <div className="m-4">
              <Link target="_blank" to={place.website} className="font-bold text-lg">
                {place.name}
              </Link>
              <div className="flex items-start justify-start gap-2">
                <p className="font-bold">Direction:</p>
                <p>{place.direction}</p>
              </div>
              
              {selectLocation && (
                <div className="flex justify-center">
                  <Button
                    textSize="text-md"
                    size="sm"
                    type={selectedPlace?.name === place.name ? "secondary" : "primary"}
                    isDisabled={false}
                    handleClick={() => {
                      selectLocation(place);
                      setSelectedPlace(place);
                    }}
                  >
                    {selectedPlace?.name === place.name ? "Selected" : "Select"}
                  </Button>
                </div>
              )}
              </div>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
};

export default MapComponent;
