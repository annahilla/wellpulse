import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import MapComponent from "./Map";
import { useEffect } from "react";
import { getLocations } from "../../redux/locationsActions";
import Spinner from "../../components/ui/Spinner";


const MapPage = () => {
  const { loading, locations } = useSelector((state: RootState) => state.locations);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(getLocations());
    }
  }, [dispatch, locations.length]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ): (
        <div className="mb-20">
          <MapComponent />
        </div>
      )}
    </div>
  );
};

export default MapPage;