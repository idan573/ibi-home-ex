import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { pages } from "./config/router/router";

function App() {
  return (
    <BrowserRouter>
     <Routes>
      {pages.map((page,index)=>(<Route path={page.path} key={index} Component={page.component}/>))}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
