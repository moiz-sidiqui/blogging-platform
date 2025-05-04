import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCard(props) {
    return (
        <div className="w-96 mx-auto p-6 border border-gray-200 rounded-lg shadow-md relative bg-gray-100">
            <article className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime="2020-03-16" className="text-gray-500">{props.time}</time>
                    </div>
                    <p className="relative z-10 rounded-full bg-blue-800 px-3 py-1.5 font-medium text-white">{props.category}</p>
                </div>
                {props.image && (
                    <img src={props.image} alt="Blog Cover" className="w-full h-64 object-cover rounded-t-lg mb-4" />
                )}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold leading-6 text-blue-800 mb-2">
                        {props.title}
                    </h3>
                    <p className="text-sm line-clamp-3 leading-6 text-gray-600">{props.description}</p>
                </div>
                <div className="absolute bottom-8 right-8">
                    <Link to={`/blogs/${props.id}`} className="text-blue-800 hover:text-indigo-600 font-medium transition duration-300">Read More</Link>
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <div className="mt-5 flex items-center gap-x-4">
                        <img src={props.userImage} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                        <div className="text-sm leading-6">
                            <p className="font-semibold text-slate-800">
                                {props.user}
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
