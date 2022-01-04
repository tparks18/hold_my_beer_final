import React, {useContext, useState} from "react";
import { UserContext } from "../context/UserContext";
import {Navigate} from "react-router-dom";
import {getRank} from "../helpers";
import VideoGallery from "../components/VideoGallery";
import { useNavigate } from "react-router-dom";
import EditProfileForm from "../forms/EditProfileForm";

const Profile = () => {
  const {user, setUser, votes} = useContext(UserContext)
  const [doEdit, setDoEdit] =useState(false)
  const navigate = useNavigate()
  const upVotes=votes?.filter((v)=>v.vote===true).length
  const downVotes=votes?.filter((v)=>v.vote===false).length
  
  if (!user.token)return <Navigate to="/login"/>
  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  {
                    !user.img?(<i className="fas fa-user-ninja fa-5x"></i>)
                    :
                    (<div><img src={user.img} height='100px'/></div>)
                  }
                  <div className="mt-3">
                    <h4 className="d-inline">{user.name}</h4> {doEdit?'':<button onClick={()=>{setDoEdit(true)}} className="btn btn-sm btn-primary rounded-circle"><i class="far fa-edit ml-2"></i></button>}
                    <p className="text-muted font-size-sm">@{user.name.replace(/\s/g, '').toLowerCase()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 15 }} className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="mt-3">
                    <h4>About</h4>
                    <p className="text-muted font-size-sm">
                      {user.bio ?? "You haven't created a profile yet, but that doesn't mean you are not a bad ass.  Go ahead crack a beer and do something wild!"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: 5 }}
                      className="feather feather-twitter mr-2 icon-inline text-info"
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                    Twitter
                  </h6>
                  <span className="text-secondary">@{user.twitter_link??'Not Linked'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: 5 }}
                      className="feather feather-instagram mr-2 icon-inline text-danger"
                    >
                      <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    Instagram
                  </h6>
                  <span className="text-secondary">@{user.instagram_link ??'Not Linked'}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: 5 }}
                      className="feather feather-facebook mr-2 icon-inline text-primary"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    Facebook
                  </h6>
                  <span className="text-secondary">@{user.facebook_link ??'Not Linked'}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div></div>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.name}</div>
                </div>

                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Location</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">{user.location}</div>
                </div>
              </div>
            </div>

            <div className="row gutters-sm">
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      Voting Stats
                    </h6>
                    <small>Upvotes {Math.round(upVotes/(upVotes+downVotes)*100)}%</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${Math.round(upVotes/(upVotes+downVotes)*100)}%` }}
                        aria-valuenow={Math.round(upVotes/(upVotes+downVotes)*100)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <small>Downvotes {Math.round(downVotes/(upVotes+downVotes)*100)}%</small>
                    <div className="progress mb-3" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${Math.round(downVotes/(upVotes+downVotes)*100)}%` }}
                        aria-valuenow={Math.round(downVotes/(upVotes+downVotes)*100)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <small>{getRank(upVotes, downVotes)}</small>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">Videos</h6>
                    <VideoGallery limit={1} user_id = {user.user_id}/>
                    <br/>
                    <button onClick={()=>navigate('/myvideos')} className="btn btn-primary">
                      Show more
                    </button>
                  </div>
                </div>
              </div>
              {
                !doEdit ? '' :
              
              <div className="col-sm-12 mb-3">
                <div className="card h-100">
                    <div className="card-body">
                      <EditProfileForm user={user} setDoEdit={setDoEdit} setUser={setUser}/>
                    </div>
                  </div>
              </div>
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
