import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import AuthorName from "./AuthorName";
import {Link} from "react-router-dom";

function Posts(props) {
    const [posts, setPosts] = useState([]);
    const [hasToken, setHasToken] = useState(false);
    const [userID, setUserID] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setHasToken(true);
            axios.get(BaseUrl + "post/user_id_search/", {
                headers:
                    {"Authorization": "Token " + localStorage.getItem("token")}
            }).then(response => {
                setUserID(response.data.userid)
            }).catch(error => {
                console.log(error)
            })
        } else {
            setHasToken(false);
        }
    }, []);

    useEffect(() => {
        axios.get(BaseUrl + "post/post_viewset/")
            .then(response => {
                setPosts(response.data);
            }).catch(error => {
            console.log(error)
        })
    }, [posts]);

    function deletePost(event){
        let post_id = event.target.value
        axios.delete(BaseUrl+"post/post_viewset/"+post_id)
            .then(response=>{
                alert("Post has been deleted");
            }).catch(error=>{
                console.log(error)
        })
    }

    return (
        <div>
            {hasToken ?
                <Link to={"/CreatePost"} className={"btn btn-success"}>Creat a Post</Link>
                :
                ""}
            {posts.map(post =>
                <p key={post.id}>
                    <Link to={"/PostDetail"} state={{post_id: post.id}}>{post.title}</Link>
                    - <AuthorName authorID={post.author}/>
                    {userID == post.author ?
                        <Fragment>
                            <Link to={"/UpdatePost"} state={{post_id: post.id}}
                                  className={"btn btn-secondary"}>Update</Link>
                            <button value={post.id} onClick={deletePost} className={"btn btn-danger"}>Delete</button>
                        </Fragment>
                        : ""}
                </p>
            )}
        </div>
    );
}

export default Posts;