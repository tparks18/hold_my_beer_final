import React, {useContext, useState} from "react";
import {UserContext} from '../context/UserContext';
import {Navigate} from "react-router-dom";
import VideoUpload from "../components/VideoUpload";
import VideoGallery from "../components/VideoGallery";


const MyVideos = () => {
  const {user} = useContext(UserContext)

  if (!user.token) return <Navigate to='/login'/>
  return (
    <div>
      <div className="heading">
        <h3>{user.name}'s Videos</h3>
      </div>
      <VideoUpload/>
      <VideoGallery user={user} user_id={user.user_id}/>

      
    </div>
  );
};

export default MyVideos;
