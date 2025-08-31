import { type ReactNode } from "react";
import { useAuth } from "../context/useAuth";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { loading, user } = useAuth();

  // Show loading state while checking authentication
  if (user === null && loading === true) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (user === null && loading === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to access this page.
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => (window.location.href = "/signin")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
