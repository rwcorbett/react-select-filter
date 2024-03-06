import React, { StrictMode } from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import App from "./src/App";
import "./src/App.css";
import "./src/styles/style.scss";

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(
    <>
        <App />
    </>
)