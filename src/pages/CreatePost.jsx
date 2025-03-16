import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import "./CreatePost.css";

export default function CreatePost() {
const [title, setTitle] = useState("");
const [content, setContent] = useState("");

const submitPost = async () => {
    if (!auth.currentUser) {
        alert("You must be logged in to post.");
        return;
    }

    await addDoc(collection(db, "posts"), {
        title,
        content,
        author: auth.currentUser.email,
        timestamp: new Date(),
    });

    alert("Post created!");
};

return (
    <div className="create-post-container">
        <h1>Create a Post</h1>

        <div className="input-container">
            <label className="label">Title</label>
            <input
            type="text"
            placeholder="Enter your title..."
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            />
        </div>

        <div className="input-container">
            <label className="label">Content</label>
            <textarea
            placeholder="Write your post..."
            onChange={(e) => setContent(e.target.value)}
            className="textarea"
            />
        </div>

        <button onClick={submitPost} className="button">Post</button>
    </div>
    );
}
