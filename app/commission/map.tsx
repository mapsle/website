import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { LatLng, Map as MapType } from "leaflet";

export default function Map({
  position,
  setPosition,
  zoom,
  setZoom,
}: {
  position: LatLng | undefined;
  setPosition: Dispatch<SetStateAction<LatLng | undefined>>;
  zoom: number | undefined;
  setZoom: Dispatch<SetStateAction<number | undefined>>;
}) {
  const [map, setMap] = useState<MapType | null>(null);

  useEffect(() => {
    if (position) {
      map?.setView([position?.lat, position?.lng], zoom);
    }
  }, [position, zoom, map]);
  useEffect(() => {
    map?.on("move", () => {
      setPosition(map.getCenter());
    });

    map?.on("zoom", () => {
      setZoom(map.getZoom());
    });
    return () => {
      map?.off("move");
      map?.off("zoom");
    };
  }, [map, setPosition, setZoom]);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={1}
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
