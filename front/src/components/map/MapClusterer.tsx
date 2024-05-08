import { CLUSTER_STYLES } from "@constants/map";
import { MarkerClustererF } from "@react-google-maps/api";
import { markersState } from "@store/map/atoms";
import { useRecoilValue } from "recoil";
import MusicMarkerItem from "./MusicMarkerItem";

const MapClusterer = ({ zoomLevel }: { zoomLevel: number }) => {
  const markers = useRecoilValue(markersState);

  const calculateGridSize = () => {
    switch (zoomLevel) {
      case 22:
        return 3;
      case 21:
        return 6;
      case 20:
        return 9;
      case 19:
        return 12;
      case 18:
        return 15;
      case 17:
        return 18;
      case 16:
        return 21;
      case 15:
        return 24;
      case 14:
        return 27;
      case 13:
        return 30;
      case 12:
        return 33;
      case 11:
        return 36;
      case 10:
        return 39;
      case 9:
        return 42;
      case 8:
        return 45;
      default:
        return 48;
    }
  };

  const gridSize = calculateGridSize();

  return (
    <>
      <MarkerClustererF
        averageCenter={true}
        gridSize={gridSize}
        styles={CLUSTER_STYLES}
        clusterClass="common_cluster"
      >
        {(clusterer) => (
          <>
            {markers.map((marker) => (
              <MusicMarkerItem
                key={marker.itemId}
                marker={marker}
                clusterer={clusterer}
              />
            ))}
          </>
        )}
      </MarkerClustererF>
      {/* {markers.map((marker) => (
            <MusicMarkerItem key={marker.itemId} marker={marker} />
          ))} */}
    </>
  );
};

export default MapClusterer;