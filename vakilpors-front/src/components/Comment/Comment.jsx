import React, { useState, useEffect, useRef, useCallback } from "react";
import useComment from "./useComment";
import ShowComment from "./ShowComment";
import { useParams } from "react-router-dom";
import SkeletonSearch from "./SkeletonSearch";
import MapSkeleton from "./MapSkeleton";
import Button from "@mui/material/Button";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

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
  const commentContainerRef = useRef();

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
  useEffect(() => {
    setPagenumber(1);
  }, []);
  console.log(commentContainerRef.current);
  return (
    <div>
      <div ref={commentContainerRef}>
        {Commentdetail1.length > 0 && !loading && (
          <>
            {Commentdetail1.map((ratei, index) => {
              return <ShowComment ratei={ratei} index={index} />;
              // if (Commentdetail1.length === index + 1) {
              //   return (
              //     <div ref={lastLawyerelement}>
              //       <ShowComment ratei={ratei} index={index} />
              //     </div>
              //   );
              // } else {
              //   return <ShowComment ratei={ratei} index={index} />;
              // }
            })}
          </>
        )}
        <div>
          {loading && (
            <div>
              {commentContainerRef.current && hasMore && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: commentContainerRef.current.innerHTML,
                  }}
                />
              )}
              <MapSkeleton />
            </div>
          )}
        </div>
        {hasMore && (
          <div
            style={{
              fontFamily: "shabnam",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="text"
              onClick={handlepagenum}
              sx={{
                fontFamily: "shabnam",
                fontSize: "1rem",
                fontWeight: "Bold",
              }}
            >
              نمایش بیشتر
            </Button>
            <ExpandMoreOutlinedIcon style={{color:'1976D3'}} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
