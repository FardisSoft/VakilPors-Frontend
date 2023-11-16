import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const MapSkeleton = () => {
  return (
    <div className="row">
      {Array.from(Array(12)).map((_, index) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-5">
          <LoadingSkeleton />
        </div>
      ))}
    </div>
  );
};

export default MapSkeleton;
