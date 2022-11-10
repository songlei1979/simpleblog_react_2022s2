import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function Category(props) {
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        axios.get(BaseUrl+"post/category/")
            .then(response=>{
                setCategories(response.data)
            }).catch(error=>{
                console.log(error)
        })
    },[])

    return (
        <Fragment>
            {categories.map(category=>
                <option value={category.id} key={category.id}>{category.name}</option>
            )}
        </Fragment>
    );
}

export default Category;