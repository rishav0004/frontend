import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import UpdateUser from "./pages/auth/UpdateUser";
import AddVehicle from "./pages/AddVehicle";
import AddDriver from "./pages/auth/AddDriver";
import Manager from "./pages/Manager";
import AddManager from "./pages/auth/AddManager";
import UpdateVehicle from "./pages/auth/UpdateVehicle";
import UpdateManager from "./pages/auth/UpdateManager";
import UpdateDriverPersonal from "./pages/auth/UpdateDriverPersonal";
import AssignVehicle from "./pages/AssignVehicle";
import DriverAssignDriver from "./pages/auth/DriverAssignDriver";
import UpdateDriver from "./pages/auth/UpdateDriver";
function App() {
  const { access_token } = useSelector((state) => state.auth);
  const usertype = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="driver" element={<DriverAssignDriver />} />
            <Route path="manager" element={<Manager />} />
            <Route
              path="update/driver/:id"
              element={
                usertype.is_head.toString() === "true" ||
                usertype.is_manager.toString() === "true" ? (
                  <UpdateDriver />
                ) : (
                  <h1>You Cannot assign Vehicle to the Driver</h1>
                )
              }
            />
            <Route
              path="assignVehicle/:id"
              element={
                usertype.is_head.toString() === "true" ||
                usertype.is_manager.toString() === "true" ? (
                  <AssignVehicle />
                ) : (
                  <h1>You Cannot assign Vehicle to the Driver</h1>
                )
              }
            />
            <Route
              path="update/driverpersonal/:id"
              element={
                usertype.is_head.toString() === "true" ||
                usertype.is_manager.toString() === "true" ? (
                  <UpdateDriverPersonal />
                ) : (
                  <h1>You are not the Authenticated user</h1>
                )
              }
            />
            <Route
              path="update/manager/:id"
              element={
                usertype.is_head.toString() === "true" && <UpdateManager />
              }
            />
            <Route
              path="update/vehicle/:id"
              element={
                usertype.is_head.toString() === "true" ||
                usertype.is_manager.toString() === "true" ? (
                  <UpdateVehicle />
                ) : (
                  <h1>You are not the Authenticated user</h1>
                )
              }
            />
            <Route
              path="addVehicle"
              element={
                usertype.is_head.toString() === "true" ||
                usertype.is_manager.toString() === "true" ? (
                  <AddVehicle />
                ) : (
                  <h1>You are not the Authenticated user</h1>
                )
              }
            />
            <Route
              path="addDriver"
              element={
                usertype.is_head.toString() === "true" ||
                usertype.is_manager.toString() === "true" ? (
                  <AddDriver />
                ) : (
                  <h1>You are not the Authenticated user</h1>
                )
              }
            />
            <Route
              path="addManager"
              element={
                usertype.is_head.toString() === "true" ? (
                  <AddManager />
                ) : (
                  <h1>You are not an Authenticated User</h1>
                )
              }
            />
            <Route
              path="login"
              element={
                !access_token ? <LoginReg /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="sendpasswordresetemail"
              element={<SendPasswordResetEmail />}
            />
            <Route
              path="api/reset-password/:id/:token"
              element={<ResetPassword />}
            />
            <Route path="update/:id" element={<UpdateUser />} />
            <Route
              path="/dashboard"
              element={access_token ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
