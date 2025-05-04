import React from 'react';
import { useParams } from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function DetailedBlogPost() {

    const [blogs, setBlogs] = useState([]);
    
    useEffect(() => {
        // Fetch blog data from the backend
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/fetchblog');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    let { id } = useParams(); // Access the id parameter from the URL

    // Assuming you have a list of blog posts and you are filtering the one with the matching id
    const blogPost = blogs.find(post => post._id === id);

    if (!blogPost) {
        return <div>Loading...</div>; // Add a loading state while fetching data
    }

    return (
        <div className="container mx-auto mt-8">
        <div className="max-w-3xl mx-auto">
            {blogPost.image && (
                <img src={`http://localhost:5001/api/fetchImage?path=${blogPost.image}`} alt="Blog Cover" className="w-full h-full object-cover rounded-lg mb-4" />
            )}
            <h1 className="text-3xl font-semibold mb-4">{blogPost.title}</h1>
            <p className="text-lg text-gray-900 mb-8">{blogPost.description}</p>
        </div>
    </div>
    );
}
