import { ethers } from "ethers";
import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import ContractABI from "../contracts/Estateta.sol/Estateta.json";
import '../styles/property.css';
import truncateEthAddress from 'truncate-eth-address';

const CONTRACT_ADDRESS = '0x7a5ED69eCe5D4fD41a0FdF9Efc1AF130f44ce3e7';

export async function getAllProperties() {
  try {
    const provider = new ethers.JsonRpcProvider("https://polygon-amoy.drpc.org");
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI.abi, provider);
    const properties = await contract.getAllProperties();

    return properties.map((prop) => ({
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
    
  } catch (err) {
    console.error("Failed to fetch properties:", err);
    return [];
  }
}

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const displayedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    async function fetchData() {
      const allProps = await getAllProperties();
      setProperties(allProps);
    }
    fetchData();
  }, []);

  return (
    <div className="property-h">
      <Navigation />
      <div className="property-grid">
        {displayedProperties.map((property) => (
          <div className="property-cardd" key={property.id}>
            <div className="image-container">
              <img src={property.images[0]} alt={property.name} />
              <span className="badge">FOR SALE</span>
              <div className="location">
                📍 {property.city}, {property.country}
              </div>
              <div className="meta">
                📷 {property.images.length} | 🛁 {property.bathroom}
              </div>
            </div>

            <div className="property-info">
              <h2 className="price">{property.price} <span>ETH</span></h2>
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
                  <p className="agent-role">Estate Agent</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>

      {/* Modal */}
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
