import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal'; // Importing react-modal

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedService, setSelectedService] = useState(null); // State to store selected service

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/api/services');
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services.");
        toast.error("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleWhatsAppContact = (service) => {
    setSelectedService(service);
    setIsModalOpen(true); // Open the modal when user clicks the button
  };

  const confirmWhatsAppContact = () => {
    window.open(`https://wa.me/91${selectedService.contactInfo}`, "_blank");
    setIsModalOpen(false); // Close the modal after action
  };

  const cancelWhatsAppContact = () => {
    setIsModalOpen(false); // Simply close the modal if user cancels
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-blue-600">Loading services...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-blue-700">Available Services</h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-600">No services available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service._id} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
              
              {/* Provider Info */}
              <div className="text-sm text-gray-700 mb-2">
                <p><span className="font-semibold">Provider:</span> {service.createdBy?.name}</p>
                <p><span className="font-semibold">Email:</span> {service.createdBy?.email}</p>
                <p><span className="font-semibold">Provider Location:</span> {service.createdBy?.location}</p>
              </div>

              {/* Service Details */}
              <div className="mt-auto">
                <p className="text-lg font-bold text-green-600 mb-1">₹{service.price}</p>
                <p className="text-sm text-gray-500">Service Location: {service.location}</p>
                <p className="text-sm text-gray-500">Contact Number: {service.contactInfo}</p>
              </div>

              {/* Contact Provider Button */}
              <button
                onClick={() => handleWhatsAppContact(service)}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Contact Provider
              </button>
            </div>
          ))}
        </div>
      )}

      {/* WhatsApp Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelWhatsAppContact}
        contentLabel="Contact Provider Confirmation"
        className="bg-white p-6 rounded-lg shadow-lg w-1/3 mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">Are you sure you want to open WhatsApp?</h2>
        <div className="flex justify-between">
          <button
            onClick={cancelWhatsAppContact}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={confirmWhatsAppContact}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Yes, Open WhatsApp
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ServiceList;
