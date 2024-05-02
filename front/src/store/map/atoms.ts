import { recoilPersist } from "recoil-persist";
import { Location, Marker } from "../../types/mapType";
import { atom } from "recoil";

const { persistAtom } = recoilPersist({
  key: "mapStorage", // 고유한 key 값
  storage: sessionStorage,
});

export const markersState = atom<Marker[]>({
  key: "markersState",
  default: [],
});

export const activeMarkerState = atom<number | null>({
  key: "activeMarkerState",
  default: null,
});

export const addressState = atom({
  key: "addressState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const mapCenterAddressState = atom({
  key: "mapCenterAddressState",
  default: "",
});

export const locationState = atom<Location>({
  key: "locationState",
  default: { lat: 0, lng: 0 },
  effects_UNSTABLE: [persistAtom],
});

export const prevLocationState = atom<Location>({
  key: "prevLocationState",
  default: { lat: 0, lng: 0 },
});

export const centerState = atom({
  key: "centerState",
  default: false,
});
