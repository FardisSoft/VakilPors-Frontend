import React from "react";
import SkeletonSearch from "./SkeletonSearch";
const MapSkeleton = () => {
  return (
    <div style={{marginBottom:"120%"}}>
      {Array.from(Array(3)).map((_, index) => (
        <div>
          <SkeletonSearch />
        </div>
      ))}
    </div>
  );
};

export default MapSkeleton;
