import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server.js";
import { toast } from "react-toastify";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        avatar: null,
    });

    const [avatar, setAvatar] = useState(null);
    const [visible, setVisible] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            avatar: file,
        });
        setAvatar(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios
            .post(`${server}/user/create-user`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                toast.success(res.data.message);
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    avatar: null,
                });
                setAvatar(null)
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
                    Register as a new user
                </h2>
            </div>

            <div className="mt-8 sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* UserName Input */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>

                            <div className="mt-1">
                                <input
                                    type="text"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    name="name"
                                    id="name"
                                    autoComplete="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>

                            <div className="mt-1">
                                <input
                                    type="email"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <div className="mt-1 relative">
                                <input
                                    type={visible ? "text" : "password"}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                {visible ? (
                                    <AiOutlineEye
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(true)}
                                    />
                                )}
                            </div>
                        </div>

                        {/* File Input */}
                        <div>
                            <label
                                htmlFor="avatar"
                                className="block text-sm font-medium text-gray-700"
                            ></label>
                            <div className="mt-2 flex items-center">
                                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                                    {avatar ? (
                                        <img
                                            src={URL.createObjectURL(avatar)}
                                            alt="Avatar"
                                        />
                                    ) : (
                                        <RxAvatar className="h-8 w-8" />
                                    )}
                                </span>

                                <label
                                    htmlFor="file-input"
                                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
                                >
                                    <span>Upload a file</span>
                                    <input
                                        type="file"
                                        className="sr-only"
                                        name="avatar"
                                        id="file-input"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Button Submit */}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 uppercase"
                            >
                                Submit
                            </button>
                        </div>

                        <div className={`${styles.noramlFlex} w-full`}>
                            <h4>Already have an account?</h4>
                            <Link to="/login" className="text-blue-600 pl-2">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
