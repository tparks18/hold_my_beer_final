import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { apiPostVideo } from "../api/apiVideo";
import Error from "./Error";
export default function VideoUpload() {
  const [uploadVideo, setUploadVideo] = useState({});
  const { user } = useContext(UserContext);
  const [videoUpload, setVideoUpload] = useState({});

  function showUploadWidget() {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "cae67",
        uploadPreset: "dwxv7gsk",
        sources: [
          "local",
          "url",
          "camera",
          "image_search",
          "google_drive",
          "facebook",
          "dropbox",
          "instagram",
          "shutterstock",
          "istock",
        ],
        googleApiKey: "187123697811376",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#1C1C1C",
            windowBorder: "#90A0B3",
            tabIcon: "#45A2DA",
            menuIcons: "#1C1C1C",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#45A2DA",
            action: "#FF620C",
            inactiveTabIcon: "#1C75B4",
            error: "#F44235",
            inProgress: "#45A2DA",
            complete: "#20B832",
            sourceBg: "#E4EBF1",
          },
          fonts: {
            default: null,
            "'Fira Sans', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Fira+Sans",
              active: true,
            },
          },
        },
      },
      (err, info) => {
        if (!err) {
          if (info.event === "success") {
            if (info.info.resource_type !== "video") {
              return;
            }
            setUploadVideo({
              filename: info.info.original_filename,
              cloud_id: info.info.public_id,
              thumbnail_url: info.info.thumbnail_url,
            });
          }
        }
      }
    );
  }

  const handleTitleVideo = (e) => {
    let vid = { ...uploadVideo, title: e.target.value };
    setUploadVideo(vid);
  };
  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const apiRes = await apiPostVideo(uploadVideo, user.token);
    setVideoUpload(apiRes);
    setUploadVideo({});
  };

  return (
    <div>
      <Error error={videoUpload.errors} />
      {Object.keys(uploadVideo).length > 0 ? (
        <form>
          <div>
            <label>Title</label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Give Your Video A Title"
              onChange={(e) => handleTitleVideo(e)}
            />
          </div>
          <div>
            <label>File</label>
          </div>
          <div>
            <input disabled value={uploadVideo.filename}></input>
          </div>
          <div>
            <button
              className="btn btn-primary btn-md"
              onClick={(e) => handleSubmitVideo(e)}
            >
              Publish
            </button>
          </div>
        </form>
      ) : (
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary btn-md"
          onClick={showUploadWidget}
        >
          Upload Video
        </button>
      )}
    </div>
  );
}
