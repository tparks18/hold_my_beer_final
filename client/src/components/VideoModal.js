import React, {useContext, useState} from 'react';
import {UserContext} from '../context/UserContext'
import {Image, Video} from 'cloudinary-react';
import { apiDeleteVideo } from '../api/apiVideo';
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const CloseButton = () =>(                  
    <Button
        type="Button"
        className="btn btn-secondary"
        data-mdb-dismiss="modal"
    >
      Close
  </Button>)

const handleDownVote=(vote, video, setCastVote)=>{
  if (!vote || vote?.vote===null){
    setCastVote({video_id: video.video_id, vote:false})
  }else{
    setCastVote({video_id: video.video_id, vote:null})
  }
  
}
const handleUpVote=(vote, video, setCastVote)=>{
  if (!vote || vote?.vote===null){
    setCastVote({video_id: video.video_id, vote:true})

    let upvotebtn = document.getElementById(`upvotebtn${video.video_id}`)
    upvotebtn.textContent=parseInt(upvotebtn.textContent)+1
    
  }else{
    setCastVote({video_id: video.video_id, vote:null})
    let upvotebtn = document.getElementById(`upvotebtn${video.video_id}`)
    upvotebtn.textContent=parseInt(upvotebtn.textContent)-1
    if (vote.vote===false){

      let downvotebtn = document.getElementById(`downvotebtn${video.video_id}`)
      downvotebtn.textContent=parseInt(upvotebtn.textContent)-1
    }
  }
  
}
const DownVoteButton = ({ video, vote, setCastVote}) =>{
  return(
      <Button onClick={()=>handleDownVote(vote, video, setCastVote,)} type="Button" disabled={vote?.vote==true} className={!vote || vote===null ? `btn btn-danger`  : vote?.vote===false ? `btn btn-secondary` : `btn btn-danger`}>
          <i
          id={`downvotebtn${video.video_id}`}
          style={{ marginRight: 5 }}
          className="fas fa-thumbs-down"
          >
              {video.down_votes}
          </i>

      </Button>
    )}

const UpVoteButton = ({video, vote, setCastVote}) =>{
  return(
    <Button onClick={()=>handleUpVote(vote, video, setCastVote)}  type="Button" disabled={vote?.vote==false} className={!vote || vote===null ? `btn btn-success` : vote?.vote===true ? `btn btn-secondary`:`btn btn-success`}>
        <i
        style={{ marginRight: 5, paddingInline:5}}
        className="fas fa-thumbs-up"
        id={`upvotebtn${video.video_id}`}
        >
            {video.up_votes}
        </i>
    </Button>)}

const handleDeleteVideo=(e, video, user, history, videos, setVideos)=>{
  e.preventDefault();
  e.stopPropagation();
  apiDeleteVideo(video.video_id, user.token).then(res=>{
    if (Object.entries(res).length !== 0) {
      let edit_vids = videos
      edit_vids = edit_vids.filter(v => v !== video)
      setVideos(edit_vids)
  }})
  
}
const DeleteButton = ({videos, setVideos, video, user, history}) =>{
  return(                      
    <Button type="Button" onClick = {(e)=>handleDeleteVideo(e,video, user, history, videos, setVideos,)} className="btn btn-danger " data-mdb-dismiss="modal">
        <i
        style={{ marginRight: 5 }}
        className="fas fa-minus-circle"
        />Delete
    </Button>
    )}

export default function VideoModal(props) {
    const {user, votes, setCastVote} = useContext(UserContext)
    let history = useNavigate();
    const user_vote =  votes?.find((vote)=>vote?.video_id==props.video.video_id)
    return (
            <div
            className="modal fade"
            id={`vid-mod${props.video.video_id}`}
            tabIndex={-1}
            aria-labelledby="exampleModal2Label"
            aria-hidden="true"
            >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="ratio ratio-16x9">
                <Video publicId={props.video.cloud_id}  controls={true} fallbackContent="Your browser does not support HTML5 video tags."/>
                </div>
                      <div className="text-center py-2"><h5>{props.video.title}</h5><i>{props.video.creator_name}</i></div>
                <div className="text-center py-3">
                  <div className="row justify-content-center">
                    <div className="text-center py-2 col-2">
                        <UpVoteButton video={props.video} vote={user_vote} setCastVote={setCastVote} />
                    </div>

                    <div className="text-center py-2 col-2">
                        {user.user_id===props.video.user_id ?<DeleteButton videos={props.videos} setVideos={props.setVideos} video={props.video}  user={user}  history={history} />:<DownVoteButton video={props.video} vote={user_vote} setCastVote={setCastVote} />}
                    </div>
                  </div>

                <CloseButton/>
                </div>
              </div>
            </div>
          </div>
    
    )
}
