// pages/MyProperties.jsx
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import ContractABI from "../contracts/Estateta.sol/Estateta.json";
import { Navigation } from "./Navigation";
import truncateEthAddress from "truncate-eth-address";
import "../styles/property.css";

const CONTRACT_ADDRESS = "0x5cA7FBA1A6EB53Bb0D37738cBFf9BDdBF1862861";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [account, setAccount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Connect to wallet and load properties
  useEffect(() => {
    async function loadMyProperties() {
      if (!window.ethereum) return alert("Please install MetaMask");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);
      const userProperties = await contract.getMyProperties();

      const formatted = userProperties.map((prop) => ({
        id: prop.id.toString(),
        owner: prop.owner,
        name: prop.name,
        images: prop.images,
        category: prop.category,
        description: prop.description,
        location: prop.location,
        city: prop.city,
        state: prop.state,
        country: prop.country,
        zipCode: prop.zipCode.toString(),
        bedroom: prop.bedroom.toString(),
        bathroom: prop.bathroom.toString(),
        built: prop.built.toString(),
        squarefit: prop.squarefit.toString(),
        price: ethers.formatEther(prop.price),
        sold: prop.sold,
        deleted: prop.deleted,
        isFractionalized: prop.isFractionalized,
        totalShares: prop.totalShares.toString(),
      }));

      setProperties(formatted);
    }

    loadMyProperties();
  }, []);

  const deleteProperty = async (propertyId) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer =await provider.getSigner();
      const estatetaContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ContractABI.abi,
        signer
      );
  
      const tx = await estatetaContract.deleteProperty(propertyId);
      await tx.wait();
      alert('Property deleted successfully!');
      window.location.reload(); // Refresh the list after deletion
    } catch (err) {
      console.error(err);
      alert('Failed to delete property');
    }
  };
  return (
    <div className="property-h">
      <Navigation />
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        My Listed Properties
      </h1>
      <div className="property-grid">
        {properties.length === 0 && <p style={{ textAlign: "center" }}>No properties found.</p>}
        {properties.map((property) => (
          <div key={property.id} className="property-cardd">
            <div className="image-container">
              <img src={property.images[0]} alt={property.name} />
              <span className="badge">{property.sold ? "SOLD" : "FOR SALE"}</span>
              <div className="location">
                📍 {property.city}, {property.country}
              </div>
              <div className="meta">
                📷 {property.images.length} | 🛁 {property.bathroom}
              </div>
            </div>

            <div className="property-info">
              <h2 className="price">
                {property.price} <span>ETH</span>
              </h2>
              <h3 className="title">{property.name}</h3>
              <p className="description">
                {property.description.slice(0, 100)}...
                <button
                  className="read-more"
                  onClick={() => {
                    setModalContent(property);
                    setShowModal(true);
                  }}
                >
                  Read more
                </button>
              </p>
              {property.isFractionalized && (
  <div className="fraction-info">
    🧩 Fractionalized • {property.totalShares} shares
  </div>
)}
              <div className="stats">
                <div>🛏 {property.bedroom} Bedrooms</div>
                <div>🛁 {property.bathroom} Bathrooms</div>
                <div>📏 {property.squarefit} Sq Ft</div>
              </div>
            </div>

            <div className="agent-footer">
              <div className="agent-info">
                <img src="https://i.pravatar.cc/40" alt="Agent" />
                <div>
                  <p className="agent-name">{truncateEthAddress(property.owner)}</p>
                  <p className="agent-role">You</p>
                </div>
              </div>
            </div>
            <button
      onClick={() => deleteProperty(property.id)}
      className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Delete
    </button>
          </div>
          
        ))}
      </div>
      {showModal && modalContent && (
  <div className="modal-overlay" onClick={() => setShowModal(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>{modalContent.name}</h2>
      <p>{modalContent.description}</p>

      {modalContent.isFractionalized && (
        <div className="modal-fractional-info">
          <strong>Fractionalized Property:</strong><br />
          Total Shares: {modalContent.totalShares}
        </div>
      )}

      <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
    </div>
  </div>
)}
    </div>
  );
}
