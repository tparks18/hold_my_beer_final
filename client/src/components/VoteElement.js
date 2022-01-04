import React from 'react'

const thumbSize=900
export default function VoteElement({vote, user}) {
    
    return (
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
          <div
            style={{ marginBottom: 20 }}
            className="bg-image hover-overlay ripple shadow-1-strong rounded"
            data-ripple-color="light"
          >
            <img
              src={vote.thumbnail_url.replace(
                /(c_limit,h_)(\d+)(,w_)(\d+)/,
                `$1${thumbSize}$3${thumbSize}`
              )}
              className="w-100"
            />
            <div>{vote.video_title}</div>
            <div>
              {vote.vote === true
                ? "You gave an Upvote"
                : vote.vote === false
                ? "You gave a Downvote"
                : "You removed your vote"}
            </div>
            <div>First vote: {vote.created_on}</div>
            <div>
              {vote.modified_on ? "Edited on: " + vote.modified_on : ""}
            </div>
          </div>
        </div>
      </div>
    );
}
