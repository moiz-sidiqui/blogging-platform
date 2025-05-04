import BlogCard from "./blogCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RecentBlogs() {
    const [blogs, setBlogs] = useState([]);
    
    useEffect(() => {
        // Fetch blog data from the backend
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/fetchblog');
                // Reverse the order of blogs and then take the first 6 items
                const reversedBlogs = response.data.reverse();
                const lastSixBlogs = reversedBlogs.slice(0, 6);
                setBlogs(lastSixBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="bg-slate-800  p-10">
            <div className="text-center mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Recent Blogs</h2>
                <p className="mt-2 text-lg leading-8 text-blue-200">Learn how to grow your business with our expert advice.</p>
            </div>

            <div className="m-5 grid grid-cols-3 gap-4">
                {blogs.map(blog => (
                    <BlogCard id={blog._id} title={blog.title} category={blog.category} description={blog.description} time={blog.time} user={blog.user} image={`http://localhost:5001/api/fetchImage?path=${blog.image}`}  userImage={`http://localhost:5001/api/fetchImage?path=${blog.userImage}`}/>
                ))}
            </div>
        </div>
    );
}
