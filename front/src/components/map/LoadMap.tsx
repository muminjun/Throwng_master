import { GOOGLE_MAPS_LIBRARIES } from "@constants/map";
import { LoadScriptNext } from "@react-google-maps/api";
import { Dispatch, SetStateAction, memo } from "react";
import MapContainer from "@components/map/MapContainer";

interface Props {
  map: google.maps.Map | null;
  setMap: Dispatch<SetStateAction<google.maps.Map | null>>;
}

const LoadMap = ({ map, setMap }: Props) => {
  return (
    <LoadScriptNext
      id="google-map-script"
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API}
      language="ko"
      libraries={GOOGLE_MAPS_LIBRARIES}
      loadingElement={<></>}
    >
      <MapContainer map={map} setMap={setMap} />
    </LoadScriptNext>
  );
};

export default memo(LoadMap);
