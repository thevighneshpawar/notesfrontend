import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Notes from "./pages/Notes";
import PrivateRoute from "./components/PrivateRoute.tsx";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/signup" />}
      />
      <Route
        path="/signup"
        element={<Signup />}
      />
      <Route
        path="/signin"
        element={<Signin />}
      />

      {/* Protected */}
      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <Notes />
          </PrivateRoute>
        }
      />

      <Route
        path="*"
        element={<h1>404 Not Found</h1>}
      />
    </Routes>
  );
}

export default App;
