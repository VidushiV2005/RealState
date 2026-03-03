"use client";

import React from "react";
import { useAppSelector } from "@/state/redux";
import { useGetPropertiesQuery } from "@/state/api";
import Loading from "@/components/Loading";

const Map = () => {
  const filters = useAppSelector((state) => state.global.filters);

  const { data: properties, isLoading, isError } =
    useGetPropertiesQuery(filters);

  if (isLoading) return <Loading />;
  if (isError || !properties)
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <p className="text-sm text-red-500">
          Failed to fetch properties
        </p>
      </div>
    );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6">
      <p className="text-lg font-semibold text-gray-700">
        🗺 Map Temporarily Disabled
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Mapbox removed (no access token).
      </p>
      <p className="text-sm text-gray-500 mt-4">
        {properties.length} properties loaded successfully.
      </p>
    </div>
  );
};

export default Map;