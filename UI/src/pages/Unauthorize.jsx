import React from "react";
import { useNavigate } from "react-router-dom";

function UnauthorizedPage() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/'); // navigates to the previous page
    };

    return (
        <div className="max-w-xl mx-auto mt-12 p-10 text-center border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Unauthorize Page</h1>
            <p className="text-lg text-gray-600 mb-6">You are not authorized to access this page.</p>
            <button
                onClick={handleGoBack}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Go Back
            </button>
        </div>
    );
}

export default UnauthorizedPage;