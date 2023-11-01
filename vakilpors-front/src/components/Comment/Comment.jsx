import React, { useState, useEffect, useRef, useCallback } from "react";
import useComment from "./useComment";
import ShowComment from "./ShowComment";
import { useParams } from "react-router-dom";
import SkeletonSearch from "./SkeletonSearch";
import MapSkeleton from "./MapSkeleton";

const Comment = () => {
  const Pagesize = 5;
  const { LawyerId } = useParams();
  const [Pagenumber, setPagenumber] = useState(1);
  const { Commentdetail1, loading, error, hasMore } = useComment(
    Pagenumber,
    Pagesize,
    LawyerId
  );
  const handlepagenum = () => {
    setPagenumber((prevpage) => prevpage + 1);
  };

  const observer = useRef();

  const lastLawyerelement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("visible");
          setPagenumber((prevpage) => prevpage + 1);
        }
      });
      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      {Commentdetail1.length > 0 && !loading && (
        <>
          {Commentdetail1.map((ratei, index) => {
            // <ShowComment ratei={ratei} index={index} />
            if (Commentdetail1.length === index + 1) {
              return (
                <div ref={lastLawyerelement}>
                  <ShowComment ratei={ratei} index={index} />
                </div>
              );
            } else {
              return <ShowComment ratei={ratei} index={index} />;
            }
          })}
        </>
      )}
      <div>
        {loading && <MapSkeleton/>}
      </div>
      {hasMore && <button onClick={handlepagenum}>نمایش بیشتر</button>}
    </div>
  );
};

export default Comment;
