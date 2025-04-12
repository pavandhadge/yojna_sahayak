import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsUserLoggedIn } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");
        setServerError("");
        
        // Validate form
        if (!email) {
            setEmailError("Email is required");
            return;
        }
        if (!password) {
            setPasswordError("Password is required");
            return;
        }

        setIsLoading(true);
        
        try {
            const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/users/login`,
                { email, password },
                { withCredentials: true }
            );
            
            const data = response.data;
            if (data.success) {
                localStorage.setItem("accessToken", data.user.accessToken);
                setIsUserLoggedIn(true);
                navigate("/");
            } else {
                setServerError(data.message);
            }
        } catch (error) {
            setServerError(
                error.response?.data?.message || 
                "An error occurred. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-8">
                    <div className="relative mb-6">
                        {/* <button 
                            onClick={() => navigate("/")}
                            className="absolute left-0 top-0 text-gray-500 hover:text-green-600 transition-colors"
                        >
                            <ArrowBack className="h-6 w-6" />
                        </button> */}
                        <h1 className="text-2xl font-bold text-center text-gray-800">
                            Welcome back
                        </h1>
                    </div>

                    {serverError && (
                        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${emailError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition`}
                            />
                            {emailError && (
                                <p className="mt-1 text-sm text-red-600">{emailError}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition`}
                            />
                            {passwordError && (
                                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md'}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : (
                                "Login"
                            )}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-2 bg-white text-sm text-gray-500">
                                    OR
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full py-2.5 px-4 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-all hover:shadow-sm flex items-center justify-center"
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#EA4335"/>
                            </svg>
                            Continue with Google
                        </button>

                        <div className="text-center text-sm text-gray-600 mt-6">
                            Don't have an account?{" "}
                            <Link 
                                to="/signup" 
                                className="text-green-600 font-medium hover:text-green-700 hover:underline transition-colors"
                            >
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;