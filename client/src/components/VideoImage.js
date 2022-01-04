import React from 'react'
const thumbSize=900;
export default function VideoImage(props) {
    return (
        <div className="row">
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
              <div style={{marginBottom: 20}}
                className="bg-image hover-overlay ripple shadow-1-strong rounded"
                data-ripple-color="light"
              >
                <img
                  src={props.video.thumbnail_url.replace(/(c_limit,h_)(\d+)(,w_)(\d+)/,`$1${thumbSize}$3${thumbSize}`)}
                  className="w-100"
                />
                <a
                  href="#!"
                  data-mdb-toggle="modal"
                  data-mdb-target={`#vid-mod${props.video.video_id}`}
                >
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                  />
                </a>
              </div>
            </div>
          </div>
    )
}
