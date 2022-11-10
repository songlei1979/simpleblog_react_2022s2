import React, {Fragment, useEffect, useState} from 'react';
import Category from "./category";
import axios from "axios";
import {BaseUrl} from "./constants";

function CreatePost(props) {
    const [token, setToken] = useState("");
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setHasToken(true);
        }
    }, [])

    function creatPost(){
        let login_token = localStorage.getItem("token");

        let data={
            title:document.getElementById("title").value,
            body:document.getElementById("body").value,
            category:document.getElementById("category").value
        };

        axios.post(BaseUrl+"post/post_viewset/", data, {headers:{
            "Authorization": "Token "+login_token
            }}).then(response=>{
                alert("Create successfully")
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <div>
            <p>Title: <input type={"text"} id={"title"}/></p>
            <p>Body: <textarea id={"body"}></textarea></p>
            <p>
                Category:
                <select id={"category"}>
                    <Category/>
                </select>
            </p>
            <button onClick={creatPost}>Create</button>
        </div>
    );
}

export default CreatePost;