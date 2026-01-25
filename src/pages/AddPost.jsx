import React from "react";
import {Comtainer,PostForm} from "../components"


function AddPost(){
    return(
        <div className="py-8">
            <Comtainer>
                <PostForm/>
            </Comtainer>
        </div>
    )
}

export default AddPost;