import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Dispatch,
  Ref,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { LatLng, Map as MapType } from "leaflet";

export default function Map({
  position,
  setPosition,
}: {
  position: LatLng | undefined;
  setPosition: Dispatch<SetStateAction<LatLng | undefined>>;
}) {
  const [map, setMap] = useState<MapType | null>(null);

  useEffect(() => {
    map?.on("move", (event) => {
      console.log(map.getCenter());
      setPosition(map.getCenter());
    });
    return () => {
      map?.off("move");
    };
  }, [map]);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full bg-black overflow-hidden"
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
