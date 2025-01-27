import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { LocationCategories, LocationInterface } from "../../types/types";
import { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../Calendar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getLocations } from "../../redux/locationsActions";
import { Link } from "react-router";
import Button from "../../components/ui/Button";
import { mapIcons } from "../../utils/mapIcons";
import { FaFilter } from "react-icons/fa";

interface MapComponentProps {
  selectLocation?: (place: LocationInterface) => void;
  singleLocation?: LocationInterface;
  position?: LatLngExpression;
}

const MapComponent = ({
  selectLocation,
  singleLocation,
  position = [41.3874, 2.1686],
}: MapComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { locations, loading } = useTypedSelector((state) => state.locations);
  const [selectedPlace, setSelectedPlace] = useState<LocationInterface | null>(
    null
  );
  const [selectedCategories, setSelectedCategories] = useState<
    LocationCategories[]
  >([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterRef = useRef<HTMLButtonElement>(null);

  const allCategories = Object.values(LocationCategories);

  useEffect(() => {
    if (!singleLocation && !loading && locations.length === 0) {
      dispatch(getLocations());
    }
  }, [dispatch, loading, locations.length, singleLocation]);

  const handleCategoryChange = (category: LocationCategories) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <MapContainer center={position} zoom={13}>
      <button onClick={toggleFilterMenu} className="bg-blue-400 text-white p-3 rounded-full absolute bottom-2 right-2 z-[1000] md:hidden" ref={filterRef}>
          <FaFilter  size={16} />
        </button>
      <div className={`${isFilterMenuOpen ? "block" : "hidden"} grid grid-cols-2 gap-1 p-4 bg-white absolute w-full bottom-0 pb-5 right-0 z-[400] rounded-sm md:block md:bottom-3 md:right-3 md:p-4 md:gap-2 md:grid-cols-3 md:pb-0 sm:w-auto`}>
        {allCategories.map((category: LocationCategories) => (
          <label key={category} className="flex items-center gap-1 text-xs md:text-sm">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {singleLocation ? (
        <Marker
          position={singleLocation.position}
          icon={mapIcons[singleLocation.category as LocationCategories]}
        >
          <Popup>
            <div className="flex flex-col m-3">
              <Link
                target="_blank"
                to={singleLocation.website}
                className="font-bold text-sm"
              >
                {singleLocation.name}
              </Link>
              <p className="single-location">{singleLocation.direction}</p>
            </div>
          </Popup>
        </Marker>
      ) : (
        locations
          .filter(
            (place) =>
              selectedCategories.length === 0 ||
              selectedCategories.includes(place.category as LocationCategories)
          )
          .map((place) => (
            <Marker
              key={place._id}
              position={place.position}
              icon={mapIcons[place.category as LocationCategories]}
            >
              <Popup>
                <div className="m-4">
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

                  {selectLocation && (
                    <div className="flex justify-center">
                      <Button
                        textSize="text-md"
                        size="sm"
                        type={
                          selectedPlace?.name === place.name
                            ? "secondary"
                            : "primary"
                        }
                        isDisabled={false}
                        handleClick={() => {
                          selectLocation(place);
                          setSelectedPlace(place);
                        }}
                      >
                        {selectedPlace?.name === place.name
                          ? "Selected"
                          : "Select"}
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
