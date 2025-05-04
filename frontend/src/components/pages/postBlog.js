import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GlobalStateContext } from '../../contexts/GlobalStateContext';
import { useContext } from 'react';

export default function PostBlog() {
    
    // State variables to store form data
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // State to store selected image file
    const [imagePreview, setImagePreview] = useState(null); // State to store image preview
    const [showAlert, setShowAlert] = useState(false); // State for showing/hiding the alert
    const { currentUsername,currentProfileImage } = useContext(GlobalStateContext);
    const navigate = useNavigate();

    // Event handler for input change
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    // Event handler for image file selection
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);

        // Display image preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedImage);
    };

    // Event handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentTime = new Date();

        // Format the current time
        const formattedTime = currentTime.toLocaleString('en-US', {
            month: 'long', // Full month name (e.g., March)
            day: 'numeric', // Numeric day of the month (e.g., 23)
            year: 'numeric', // Full year (e.g., 2024)
            hour: '2-digit', // 2-digit hour (e.g., 08
            minute: '2-digit', // 2-digit minute (e.g., 54)
            hour12: true // Use 12-hour clock (e.g., AM/PM)
        });

        // Create FormData object to send form data including the image file
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('time', formattedTime);
        formData.append('user', currentUsername); // it is sending username of user who is logged in and posting blog
        formData.append('userImage',currentProfileImage); // it is sending the profile image path of user who is logged in and posting blog
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:5001/api/postBlog/postblog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data for file upload
                }
            });
            console.log(response.data);
            setShowAlert(true); // Show the alert
            // Hide the alert after 3 seconds
            setTimeout(() => {
                setShowAlert(false);
                navigate('/home'); // Navigate to home page after hiding the alert
            }, 2000);
        } catch (error) {
            console.error('Error posting blog:', error);
        }
    };

    return (
        <>
            <div className="py-10 bg-slate-800">
                <div className="text-center mb-10">
                    <h1 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">Publish Your Thoughts</h1>
                    <p className="mt-3 text-lg text-blue-200">Engage Your Audience With Compelling Content</p>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="space-y-12 mx-auto max-w-3xl">
                        <div className="pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4 flex flex-col">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">Title</label>
                                    <div className="mt-2">
                                        <input type="text" name="title" id="title" value={title} required onChange={handleTitleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Give title to your blog" />
                                    </div>
                                </div>
                                <div className="sm:col-span-2 flex flex-col">
                                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">Blog Category</label>
                                    <div className="mt-2">
                                        <select id="category" name="category" value={category} required onChange={handleCategoryChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <option value="" disabled>Select Category</option>
                                            <option value="Business">Business</option>
                                            <option value="Travel">Travel</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Sports">Sports</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">Blog Description</label>
                                    <div className="mt-2">
                                        <textarea id="description" name="description" value={description} required onChange={handleDescriptionChange} rows="3" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Type your blog"></textarea>
                                    </div>
                                </div>
                                <div class="col-span-full">
                                    <label for="cover-photo" class="block text-sm font-medium leading-6 text-white">Cover photo</label>
                                    <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-white">
                                        {imagePreview && (
                                            <img src={imagePreview} alt="Selected" className="max-h-40 mx-auto mb-4" />
                                        )}
                                        <div class="text-center">
                                            <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                            </svg>
                                            <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-blue-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" class="sr-only" onChange={handleImageChange} />
                                                </label>
                                                <p class="pl-1">or drag and drop</p>
                                            </div>
                                            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-white">Cancel</button>
                        <button type="submit" className="rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2">Save</button>
                    </div>
                </form>
            </div>
            {/* Alert for successful blog post */}
            {showAlert && (
                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-64 p-4 bg-green-600 text-white text-center rounded-lg shadow-lg">
                    <p className="text-lg font-semibold">Success!</p>
                    <p className="text-sm mt-2">Blog posted successfully.</p>
                </div>
            )}
        </>
    );
}
