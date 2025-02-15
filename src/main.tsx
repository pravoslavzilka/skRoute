import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <StrictMode>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </StrictMode>
);
