import React, {useEffect, useState} from 'react';
import Category from "./category";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function UpdatePost(props) {
    const location=useLocation();
    const post_id = location.state.post_id
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState(0);


    useEffect(()=>{
        axios.get(BaseUrl+"post/post_viewset/"+post_id)
            .then(response=>{
                setPost(response.data);
                setTitle(response.data.title);
                setBody(response.data.body);
                setCategory(response.data.category);
            }).catch(error=>{
                console.log(error)
        })
    }, [])

    function updatePost(){
        let login_token = localStorage.getItem("token");

        let data={
            title:title,
            body:body,
            category:category
        };

        axios.patch(BaseUrl+"post/post_viewset/"+post_id+"/", data, {headers:{
            "Authorization": "Token "+login_token
            }}).then(response=>{
                alert("Update successfully")
        }).catch(error=>{
            console.log(error)
        })
    }

    function titleHandler(event){
        setTitle(event.target.value);
    }

    function bodyHandler(event){
        setBody(event.target.value);
    }

    function categoryHandler(event){
        setCategory(event.target.value);
    }

    return (
        <div>
            <p>Title: <input type={"text"} id={"title"} value={title} onChange={titleHandler}/></p>
            <p>Body: <textarea id={"body"} value={body} onChange={bodyHandler}></textarea></p>
            <p>
                Category:
                <select id={"category"} value={category} onChange={categoryHandler}>
                    <Category/>
                </select>
            </p>
            <button onClick={updatePost}>Update</button>
        </div>
    );
}

export default UpdatePost;