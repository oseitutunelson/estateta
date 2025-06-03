import { ethers } from "ethers";
import React, { useState ,useEffect} from 'react';
import { Navigation } from './Navigation';
import ContractABI from "../contracts/Estateta.sol/Estateta.json"; 
import '../styles/property.css';
import truncateEthAddress from 'truncate-eth-address';
import { MapPin, Bath, BedDouble, Ruler, Heart, Share2 } from "lucide-react";

const CONTRACT_ADDRESS = '0xc6dE357BD6A7e1c5Fd648A1ef0b1fa137F8455a1';  

export async function getAllProperties() {
  try {
    const provider = new ethers.JsonRpcProvider("https://polygon-amoy.drpc.org");
   // const signer = await provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI.abi, provider);

    const properties = await contract.getAllProperties();

    const formatted = properties.map((prop) => ({
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
    }));

    return formatted;
  } catch (err) {
    console.error("Failed to fetch properties:", err);
    return [];
  }
}

export default function PropertyList() {
    const [properties, setProperties] = useState([]);
  
    useEffect(() => {
      async function fetchData() {
        const allProps = await getAllProperties();
        setProperties(allProps);
      }
      fetchData();
    }, []);
  
    return (
      <div className="property-h">
        <Navigation/>          
        <div className="property-grid">

        {properties.map((property) => (
          <div className="property-cardd">
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
            <h2 className="price"> {property.price}<span>ETH</span></h2>
            <h3 className="title">{property.name}</h3>
            <p className="description">{property.description}</p>
    
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
        ))}        </div>

        </div>
        );
  }