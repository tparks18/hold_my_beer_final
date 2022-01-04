import React, { useContext } from "react";
import skateboardpic from "../images/undraw_skateboard.svg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <div className="big-container">
        <div className="text-container">
          <h1>Find your community</h1>
          <h3>Record, upload, discover</h3>
          <div className="description-container">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              fringilla magna quis augue dapibus, ac vestibulum quam porta. In
              ut enim lorem. Etiam et velit fringilla, fermentum dui et, euismod
              mi. Pellentesque lorem tellus, maximus nec dui ac, aliquet
              pellentesque lorem.
            </p>
            <button type="button" className="btn btn-primary">
              <Link
                style={{ color: "inherit", textDecoration: "inherit" }}
                to="/videos"
              >
                Enter
              </Link>
            </button>
          </div>
        </div>
        <div className="landing-image-container">
          <img
            style={{ height: "500px" }}
            src={skateboardpic}
            alt="manskateboarding"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
