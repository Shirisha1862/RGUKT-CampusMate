import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ServiceList from './pages/services/ServiceList';
import MyServices from './pages/services/MyServices';
import EditServiceForm from './pages/services/EditServiceForm';
import AddService from "./pages/services/AddService";
import SearchResults from "./pages/SearchResults";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import UpdateService from './pages/services/UpdateService';
import StudyMaterialCard from './pages/StudyMaterials/StudyMaterialCard';
import UploadMaterial from './pages/StudyMaterials/UploadMaterial';
import MaterialList from './pages/StudyMaterials/MaterialList';
import MyStudyMaterials from './pages/StudyMaterials/MyStudyMaterials';
import UpdateMaterial from './pages/StudyMaterials/UpdateMaterial';

function App() {
  return (
    <AuthProvider>
      <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/edit/:id" element={<EditServiceForm />} />
            <Route path="/my-services" element={<PrivateRoute><MyServices /></PrivateRoute>} />
            <Route path="/services/update/:id" element={<UpdateService />} />
            <Route path="/add-service" element={<AddService />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/study-materials" element={<MaterialList />} />
            <Route path="/upload-material" element={<PrivateRoute><UploadMaterial /></PrivateRoute>} />
            <Route path="/my-study-materials" element={<PrivateRoute><MyStudyMaterials /></PrivateRoute>} />
            <Route path="/study-materials/update/:id" element={<PrivateRoute><UpdateMaterial /></PrivateRoute>} />
          </Routes>
        </main>

        <footer className="bg-blue-600 text-white py-4 mt-10">
          <div className="max-w-screen-xl mx-auto text-center">
            <p>&copy; 2025 CampusConnect. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
