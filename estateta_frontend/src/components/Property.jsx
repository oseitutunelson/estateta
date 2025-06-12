import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import ContractABI from "../contracts/Estateta.sol/Estateta.json";
import truncateEthAddress from "truncate-eth-address";
import { getAllProperties } from "./GetProperties";

const CONTRACT_ADDRESS = "0x7a5ED69eCe5D4fD41a0FdF9Efc1AF130f44ce3e7";

const Property = () =>{
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allProps = await getAllProperties();
      setProperties(allProps);
    }
    fetchData();
  }, []);

return(
<section className="property" id="property">
        <div className="container">

          <p className="section-subtitle">Properties</p>

          <h2 className="h2 section-title">Featured Listings</h2>
        
          <ul className="property-list has-scrollbar">
{properties.slice(0, 4).map((property, index) => (
            <li>
                <div className="property-card" key={index}>

                <figure className="card-banner">

                  <a href="#">
                    <img src={property.images[0]} alt="New Apartment Nice View" className="w-100"/>
                  </a>

                  <div className="card-badge green">For Sale</div>

                  <div className="banner-actions">

                    <button className="banner-actions-btn">
                      <ion-icon name="location"></ion-icon>

                      <address>{property.city}, {property.country}</address>
                    </button>

                    <button className="banner-actions-btn">
                      <ion-icon name="camera"></ion-icon>

                      <span>{property.images.length}</span>
                    </button>

                    <button className="banner-actions-btn">
                      <ion-icon name="film"></ion-icon>

                      <span>{property.bathroom}</span>
                    </button>

                  </div>

                </figure>

                <div className="card-content">

                  <div className="card-price">
                    <strong>{property.price}</strong> ETH
                  </div>

                  <h3 className="h3 card-title">
                    <a href="#">{property.name}</a>
                  </h3>

                  <p className="card-text">
                    {property.description}
                  </p>

                  <ul className="card-list">

                    <li className="card-item">
                      <strong>{property.bedroom}</strong>

                      <ion-icon name="bed-outline"></ion-icon>

                      <span>Bedrooms</span>
                    </li>

                    <li className="card-item">
                      <strong>{property.bathroom}</strong>

                      <ion-icon name="man-outline"></ion-icon>

                      <span>Bathrooms</span>
                    </li>

                    <li className="card-item">
                      <strong>{property.squarefit}</strong>

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
                        <a href="#">{truncateEthAddress(property.owner)}</a>
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
            </li>

            
 ))}
              
            {/* <li>
              <div className="property-card">

                <figure className="card-banner">

                  <a href="#">
                    <img src="/images/property-2.jpg" alt="Modern Apartments" className="w-100"/>
                  </a>

                  <div className="card-badge orange">For Sales</div>

                  <div className="banner-actions">

                    <button className="banner-actions-btn">
                      <ion-icon name="location"></ion-icon>

                      <address>Belmont Gardens, Chicago</address>
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
                    <strong>$34,900</strong>/Month
                  </div>

                  <h3 className="h3 card-title">
                    <a href="#">Modern Apartments</a>
                  </h3>

                  <p className="card-text">
                    Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood
                  </p>

                  <ul className="card-list">

                    <li className="card-item">
                      <strong>3</strong>

                      <ion-icon name="bed-outline"></ion-icon>

                      <span>Bedrooms</span>
                    </li>

                    <li className="card-item">
                      <strong>2</strong>

                      <ion-icon name="man-outline"></ion-icon>

                      <span>Bathrooms</span>
                    </li>

                    <li className="card-item">
                      <strong>3450</strong>

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
                        <a href="#">William Seklo</a>
                      </p>

                      <p className="author-title">Estate Agents</p>
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
            </li>

            <li>
              <div className="property-card">

                <figure className="card-banner">

                  <a href="#">
                    <img src="/images/property-3.jpg" alt="Comfortable Apartment" className="w-100"/>
                  </a>

                  <div className="card-badge green">For Rent</div>

                  <div className="banner-actions">

                    <button className="banner-actions-btn">
                      <ion-icon name="location"></ion-icon>

                      <address>Belmont Gardens, Chicago</address>
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
                    <strong>$34,900</strong>/Month
                  </div>

                  <h3 className="h3 card-title">
                    <a href="#">Comfortable Apartment</a>
                  </h3>

                  <p className="card-text">
                    Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood
                  </p>

                  <ul className="card-list">

                    <li className="card-item">
                      <strong>3</strong>

                      <ion-icon name="bed-outline"></ion-icon>

                      <span>Bedrooms</span>
                    </li>

                    <li className="card-item">
                      <strong>2</strong>

                      <ion-icon name="man-outline"></ion-icon>

                      <span>Bathrooms</span>
                    </li>

                    <li className="card-item">
                      <strong>3450</strong>

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
                        <a href="#">William Seklo</a>
                      </p>

                      <p className="author-title">Estate Agents</p>
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
            </li>

            <li>
              <div className="property-card">

                <figure className="card-banner">

                  <a href="#">
                    <img src="/images/property-4.png" alt="Luxury villa in Rego Park" className="w-100"/>
                  </a>

                  <div className="card-badge green">For Rent</div>

                  <div className="banner-actions">

                    <button className="banner-actions-btn">
                      <ion-icon name="location"></ion-icon>

                      <address>Belmont Gardens, Chicago</address>
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
                    <strong>$34,900</strong>/Month
                  </div>

                  <h3 className="h3 card-title">
                    <a href="#">Luxury villa in Rego Park</a>
                  </h3>

                  <p className="card-text">
                    Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood
                  </p>

                  <ul className="card-list">

                    <li className="card-item">
                      <strong>3</strong>

                      <ion-icon name="bed-outline"></ion-icon>

                      <span>Bedrooms</span>
                    </li>

                    <li className="card-item">
                      <strong>2</strong>

                      <ion-icon name="man-outline"></ion-icon>

                      <span>Bathrooms</span>
                    </li>

                    <li className="card-item">
                      <strong>3450</strong>

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
                        <a href="#">William Seklo</a>
                      </p>

                      <p className="author-title">Estate Agents</p>
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
            </li> */}

          </ul>

        </div>
      </section>
      )
}     
export default Property;