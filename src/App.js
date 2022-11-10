import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Category from "./components/category";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Posts from "./components/Posts";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";

function App() {
  return (
    <div className="App">
        <NavBar />
      <Routes>
        <Route path="/" element={ <Posts/> } />
        <Route path="category" element={ <Category/> } />
          <Route path="login" element={ <Login/> } />
          <Route path={"PostDetail"} element = {<PostDetail />} />
          <Route path={"CreatePost"} element = {<CreatePost />}/>
          <Route path={"UpdatePost"} element = {<UpdatePost />}/>
      </Routes>
    </div>
  );
}

export default App;
