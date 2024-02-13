import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Auth/Login";
import Dashboard from "./Components/User/Dashboard";
import Register from "./Components/Auth/Register";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";
import Admindash from "./Components/Admin/Admindash";
import VerifyEmail from "./Components/Auth/VerifyEmail";
import PrivateRoute from "./Components/PrivateRoute";
import ProductManagement from "./Components/Admin/ProductManagement/ProductManagement";
import UpdateProduct from "./Components/Admin/ProductManagement/UpdateProduct";
import Profile from "./Components/User/Profile";
import Error from "./Components/Auth/Error";
import UserManagement from "./Components/Admin/UserManagement/UserManagement";
import EditPic from "./Components/User/EditPic";
import CategoryManagement from "./Components/Admin/CategoryManagement/CategoryManagement";
import UpdateCategory from "./Components/Admin/CategoryManagement/UpdateCategory";
import ViewUser from "./Components/Admin/UserManagement/ViewUser";
import EditUser from "./Components/Admin/UserManagement/EditUser";
import ProductDetail from "./Components/Admin/ProductManagement/ProductDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admindash" element={<Admindash />} />
            <Route path="/Category" element={<CategoryManagement />} />
            <Route path="/updateCategory/:id" element={<UpdateCategory />} />
            <Route path="/updateProduct/:id" element={<UpdateProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Product" element={<ProductManagement />} />
            <Route path="/viewProduct/:id" element={<ProductDetail />} />

            <Route path="/User" element={<UserManagement />} />
            <Route path="/viewUser/:id" element={<ViewUser />} />
            <Route path="/editUser/:id" element={<EditUser />} />
            <Route path="/editpic" element={<EditPic />} />
          </Route>
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route
            path="/reset_password/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="/verify_email/:id/:token" element={<VerifyEmail />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
