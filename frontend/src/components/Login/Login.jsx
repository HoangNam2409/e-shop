import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {server} from '../../server.js'
import {toast} from 'react-toastify'
 
export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post(`${server}/user/login-user`, formData, {
            withCredentials: true,
        }).then((res) => {
            toast.success('Login Successfully!')
            navigate('/')
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
                    Login to your account
                </h2>
            </div>

            <div className="mt-8 sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    type="text"
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

                        {/* Remember Me */}
                        <div className={`${styles.noramlFlex} justify-between`}>
                            {/* Remember Me */}
                            <div className={`${styles.noramlFlex}`}>
                                <input
                                    type="checkbox"
                                    name="remember-me"
                                    id="remember-me"
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />

                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>
                            {/* Forgot Password */}
                            <div className="text-sm">
                                <a
                                    href=".forgot-password"
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Forgot your password
                                </a>
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
                            <h4>Not have any account?</h4>
                            <Link to="/sign-up" className="text-blue-600 pl-2">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
