import { ethers } from "ethers";
import React, { useState ,useEffect} from 'react';
import { Navigation } from './Navigation';
import ContractABI from "../contracts/Estateta.sol/Estateta.json"; 
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
      <div>
        <Navigation/>
        {properties.map((p) => (
          <ul key={p.id}className="property-list has-scrollbar">
             <div className="property-card">

<figure className="card-banner">

  <a href="#">
    <img src={p.images[0]} alt="New Apartment Nice View" className="w-100"/>
  </a>

  <div className="card-badge green">For Sale</div>

  <div className="banner-actions">

    <button className="banner-actions-btn">
      <ion-icon name="location"></ion-icon>

      <address>{p.location}, {p.city}</address>
    </button>

    <button className="banner-actions-btn">
      <ion-icon name="camera"></ion-icon>

      <span>4</span>
    </button>

    <button className="banner-actions-btn">
      <ion-icon name="film"></ion-icon>

      <span>2</span>
    </button>

  </div>

</figure>

<div className="card-content">

  <div className="card-price">
    <strong>{p.price}</strong> ETH
  </div>

  <h3 className="h3 card-title">
    <a href="#">{p.name}</a>
  </h3>

  <p className="card-text">
    {p.description}
  </p>

  <ul className="card-list">

    <li className="card-item">
      <strong>{p.bedroom}</strong>

      <ion-icon name="bed-outline"></ion-icon>

      <span>Bedrooms</span>
    </li>

    <li className="card-item">
      <strong>{p.bathroom}</strong>

      <ion-icon name="man-outline"></ion-icon>

      <span>Bathrooms</span>
    </li>

    <li className="card-item">
      <strong>{p.squarefit}</strong>

      <ion-icon name="square-outline"></ion-icon>

      <span>Square Ft</span>
    </li>

  </ul>

</div>

<div className="card-footer">

  <div className="card-author">

    <figure className="author-avatar">
      <img src="/images/author.jpg" alt="William Seklo" className="w-100"/>
    </figure>

    <div>
      <p className="author-name">
        <a href="#">{p.owner}</a>
      </p>

      <p className="author-title">Estate Owner</p>
    </div>

  </div>

  <div className="card-footer-actions">

    <button className="card-footer-actions-btn">
      <ion-icon name="resize-outline"></ion-icon>
    </button>

    <button className="card-footer-actions-btn">
      <ion-icon name="heart-outline"></ion-icon>
    </button>

    <button className="card-footer-actions-btn">
      <ion-icon name="add-circle-outline"></ion-icon>
    </button>

  </div>

</div>

</div>
          </ul>
        ))}
      </div>
    );
  }