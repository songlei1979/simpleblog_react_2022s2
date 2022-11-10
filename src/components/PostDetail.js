import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import {BaseUrl} from "./constants";

function PostDetail(props) {
    const location=useLocation();
    const post_id = location.state.post_id
    const [post, setPost] = useState({});
    useEffect(()=>{
        axios.get(BaseUrl+"post/post_viewset/"+post_id)
            .then(response=>{
                setPost(response.data)
            }).catch(error=>{
                console.log(error)
        })
    }, [post])

    return (
        <div>
            <h1>{post.title}</h1>
            <div>
                {post.body}
            </div>
        </div>
    );
}

export default PostDetail;