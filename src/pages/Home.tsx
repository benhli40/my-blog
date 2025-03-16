import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Login from "./Login";
import "./Home.css";

// TypeScript Interface for Posts
interface Post {
    id: string;
    title: string;
    content: string;
}

export default function Home() {
const [posts, setPosts] = useState<Post[]>([]);
const [user, setUser] = useState<User | null>(null);

  // ✅ Listen for auth state changes
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener
}, []);

useEffect(() => {
    const fetchPosts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsData: Post[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title || "Untitled",
            content: doc.data().content || "No content available",
        }));

        setPosts(postsData);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
    };

    fetchPosts();
}, []);

return (
    <div className="home-container">
      {/* 🔹 Remove onLogin */}
        <Login user={user} />

        <h1>My Blog</h1>

      {/* 🔹 Show "Create a Post" button only if user is logged in */}
        {user && (
        <Link to="/create" className="create-post-link">Create a Post</Link>
        )}

        <div className="blog-posts">
        {posts.length === 0 ? (
            <p>No posts available.</p>
        ) : (
            posts.map((post) => (
            <div key={post.id} className="blog-card">
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-content">{post.content.split(" ").slice(0, 30).join(" ")}...</p>
                <Link to={`/post/${post.id}`} className="read-more">Read More</Link>
            </div>
            ))
        )}
        </div>
    </div>
    );
}


