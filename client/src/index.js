import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import {CloudinaryContext} from 'cloudinary-react';
import AppContextProvider from "./context/UserContext";

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <CloudinaryContext cloudName="cae67" secure="true" upload_preset="dwxv7gsk">
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </CloudinaryContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
