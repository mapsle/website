"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { LatLng } from "leaflet";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useQuery, QueryClient } from "@tanstack/react-query";

type LatLngHandlerProps = {
  search: string;
  onPositionChange: (position: LatLng | undefined) => void;
  onZoomChange: (zoom: number | undefined) => void;
};

export function Geocode({
  search,
  onPositionChange,
  onZoomChange,
}: LatLngHandlerProps) {
  const queryClient = new QueryClient();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["geocode", search],
    queryFn: async () => {
      if (!search) return [];
      const response = await fetch(`/api/geocode?q=${search}`);
      const json = await response.json();
      return json;
    },
  });

  if (isPending) return <LoaderCircle className="w-4 h-4 animate-spin" />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 gap-3">
      {data &&
        data.length !== 0 &&
        data.map((item: any) => (
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => {
              onZoomChange(16);
              onPositionChange(new LatLng(item.lat, item.lon));
            }}
            key={item.place_id}
          >
            {item.name}
          </Button>
        ))}
    </div>
  );
}

export function createLatLng(lat: number, lng: number): LatLng {
  return new LatLng(lat, lng);
}

export default function LatLngHandler({
  search,
  onPositionChange,
  onZoomChange,
}: LatLngHandlerProps) {
  return (
    <Geocode
      search={search}
      onPositionChange={onPositionChange}
      onZoomChange={onZoomChange}
    />
  );
}
