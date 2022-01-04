import React, { useEffect, useState } from "react";
import VideoModal from "./VideoModal";
import VideoImage from "./VideoImage";
import { apiGetVideosByUserID, apiGetVideos } from "../api/apiVideo";

export default function VideoGallery(props) {
  if (props.user_id) return <UserGallery {...props} />;
  return <FullGallery user={props.user} />;
}

function UserGallery(props) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const runHook = async () => {
      const res = await apiGetVideosByUserID(props.user_id);
      if (!props.limit) setVideos(res.data);
      if (props.limit) setVideos(res.data.slice(0, props.limit));
    };
    runHook();
    return;
  }, []);
  return (
    <section>
      <section>
        {videos?.map((video) => (
          <VideoImage key={video.video_id} video={video} />
        ))}
      </section>

      <section>
        {videos?.map((video) => (
          <VideoModal
            videos={videos}
            setVideos={setVideos}
            key={video.video_id}
            video={video}
          />
        ))}
      </section>
    </section>
  );
}

function FullGallery(props) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const runHook = async () => {
      const res = await apiGetVideos();
      if (!props.limit) setVideos(res.data);
      if (props.limit) setVideos(res.data.slice(0, props.limit));
    };
    runHook();
    return;
  }, []);

  return (
    <section>
      <section>
        {videos?.map((video) => (
          <VideoImage key={video.video_id} video={video} />
        ))}
      </section>

      <section>
        {videos?.map((video) => (
          <VideoModal
            videos={videos}
            setVideos={setVideos}
            key={video.video_id}
            video={video}
          />
        ))}
      </section>
    </section>
  );
}
