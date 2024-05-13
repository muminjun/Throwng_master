import { memo } from "react";
import { useRecoilValue } from "recoil";
import { markersState } from "@store/map/atoms";
import MusicMarkerItem from "./MusicMarkerItem";

const MapClusterer = () => {
  const markers = useRecoilValue(markersState);

  console.log(1);

  return markers.map((marker) => (
    <MusicMarkerItem key={marker.itemId} marker={marker} />
  ));
};

export default memo(MapClusterer);
