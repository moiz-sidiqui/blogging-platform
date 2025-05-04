import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import BlogCard from "../blog/blogCard";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Fetch blog data from the backend
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/fetchblog');
                setBlogs(response.data.reverse());
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [location]); // Add location to the dependency array

    // Get category from the URL
    const category = new URLSearchParams(location.search).get("category");

    // Filter blogs based on category
    const filteredBlogs = category ? blogs.filter(blog => blog.category === category) : blogs;

    return (
        <>
            <div className="bg-slate-800 p-10">
                <div className="text-center mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{category ? `${category} Blogs` : "All Blogs"}</h2>
                    {category && (
                        <p className="mt-2 text-lg leading-8 text-blue-200">Learn more about {category.toLowerCase()}.</p>
                    )}
                </div>

                <div className="m-5 grid grid-cols-3 gap-4">
                    {filteredBlogs.map(blog => (
                        <BlogCard id={blog._id} title={blog.title} category={blog.category} description={blog.description} time={blog.time} user={blog.user} image={`http://localhost:5001/api/fetchImage?path=${blog.image}`} userImage={`http://localhost:5001/api/fetchImage?path=${blog.userImage}`} />
                    ))}
                </div>
            </div>
        </>
    );
}
