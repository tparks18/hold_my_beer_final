// import React from "react";

// const Newsfeed = () => {
//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-7 col-xs-12 col-md-offset-3">
//           <div className="panel" id="daily-feed">
//             {/* New Post Modal Here */}

//             {/* Button trigger modal */}
//             <button
//               type="button"
//               className="float-end btn btn-primary"
//               data-mdb-toggle="modal"
//               data-mdb-target="#exampleModal"
//             >
//               <i style={{ marginRight: 5 }} class="fas fa-pen"></i>
//               New Post
//             </button>
//             {/* Modal */}
//             <div
//               className="modal fade"
//               id="exampleModal"
//               tabIndex={-1}
//               aria-labelledby="exampleModalLabel"
//               aria-hidden="true"
//             >
//               <div className="modal-dialog">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title" id="exampleModalLabel">
//                       What's on your mind?
//                     </h5>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-mdb-dismiss="modal"
//                       aria-label="Close"
//                     />
//                   </div>
//                   <div className="modal-body">
//                     <div className="mb-3">
//                       <h5>Title</h5>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Title"
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <h5>Content</h5>
//                       <textarea
//                         className="form-control"
//                         rows="3"
//                         placeholder="Content"
//                       ></textarea>
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-secondary"
//                       data-mdb-dismiss="modal"
//                     >
//                       Close
//                     </button>
//                     <button type="button" className="btn btn-primary">
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* End of new post modal here */}

//             <div className="panel-heading">
//               <h3 className="panel-title">Daily feed</h3>
//             </div>

//             <div className="panel-body">
//               {/* style={{ marginLeft: 10 }} */}
//               <ul className="list-group list-group-dividered list-group-full">
//                 <li className="list-group-item">
//                   <div className="media">
//                     <div className="media-body">
//                       <small className="float-end">2h ago</small>
//                       <h4 className="media-heading">
//                         <a className="name">First Last</a> made a new post.
//                       </h4>
//                       <div>This is my blog post.</div>
//                       <small>Today 2:55 pm - 11.28.2021</small>
//                       <div className="actions margin-top-10">
//                         <button
//                           type="button"
//                           className="btn btn-success btn-xs waves-effect waves-light"
//                         >
//                           <i
//                             style={{ marginRight: 5 }}
//                             class="fas fa-thumbs-up"
//                           ></i>
//                           Like
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               </ul>
//             </div>

//             <div className="panel-body">
//               {/* style={{ marginLeft: 10 }} */}
//               <ul className="list-group list-group-dividered list-group-full">
//                 <li className="list-group-item">
//                   <div className="media">
//                     <div className="media-body">
//                       <small className="float-end">2h ago</small>
//                       <h4 className="media-heading">
//                         <a className="name">Another user</a> made a new post.
//                       </h4>
//                       <div>
//                         This blog post belongs to a user I am following.
//                       </div>
//                       <small>Today 3:55 pm - 11.29.2021</small>
//                       <div className="actions margin-top-10">
//                         <button
//                           type="button"
//                           className="btn btn-success btn-xs waves-effect waves-light"
//                         >
//                           <i
//                             style={{ marginRight: 5 }}
//                             class="fas fa-thumbs-up"
//                           ></i>
//                           Like
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Newsfeed;
