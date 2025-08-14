// Top of the file – no changes
import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { Navigation } from './Navigation';
import '../styles/createproperty.css';
import contractAbi from '../contracts/Estateta.sol/Estateta.json';
import { useAppKitAccount } from "@reown/appkit/react";
import dummyProperties from "./properties.json";
import CryptoJS from "crypto-js";

const CONTRACT_ADDRESS = '0x5cA7FBA1A6EB53Bb0D37738cBFf9BDdBF1862861';

const CreateProperty = () => {
  const { address } = useAppKitAccount();

  const [form, setForm] = useState({
    name: '',
    fullLegalName: '',
    propertyDocument: null,
    category: '',
    description: '',
    location: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    bedroom: '',
    bathroom: '',
    built: '',
    squarefit: '',
    price: '',
    images: [],
    isFractional: false,
    fractionCount: 0,
    verificationStatus: "Pending"
  });
  
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setForm({ ...form, propertyDocument: files[0] });
    }
  };

  const pinFileToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: "d6ae73950b028dc4543d",
          pinata_secret_api_key: "67e454a8c498bf67dd67ca30bdc154db426bd885d9928714efc0a4b5ee86cd42",
        },
      }
    );

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  };

  const handleImageUpload = async () => {
    const imageUrls = [];
    for (let file of form.images) {
      const url = await pinFileToIPFS(file);
      imageUrls.push(url);
    }
    return imageUrls;
  };

  const computeFileHash = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
    return CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
  };

  const handleSubmit = async () => {
    if (!form.fullLegalName) {
      alert("Please enter full legal name");
      return;
    }
    if (!form.propertyDocument) {
      alert("Please upload property document");
      return;
    }

    setUploading(true);
    try {
      const documentHash = await computeFileHash(form.propertyDocument);

      const match = dummyProperties.find(
        (property) => property.propertyDocumentHash === documentHash
      );
      const verified = !!match;  

      const imageUrls = await handleImageUpload();

      const documentUrl = await pinFileToIPFS(form.propertyDocument);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
  
      const property = {
        id: 0,
        owner: address,
        name: form.name,
        fullLegalName: form.fullLegalName,
        propertyDocument: documentUrl,
        propertyDocumentHash: documentHash,  
        verified,  
        pending:form.verificationStatus,
        images: imageUrls,
        category: form.category,
        description: form.description,
        location: form.location,
        city: form.city,
        state: form.state,
        country: form.country,
        zipCode: Number(form.zipCode),
        bedroom: Number(form.bedroom),
        bathroom: Number(form.bathroom),
        built: Number(form.built),
        squarefit: Number(form.squarefit),
        price: ethers.parseEther(form.price || "0"),
        sold: false,
        deleted: false,
        isFractionalized: form.isFractional,
        totalShares: form.isFractional ? Number(form.fractionCount) : 0,
      };
      
      const tx = await contract.createProperty(
        property,
        form.isFractional,
        form.isFractional ? Number(form.fractionCount) : 0
      );
  
      await tx.wait();
      alert(
        `${verified ? "✅ Verified" : "⚠️ Unverified"} - ${
          form.isFractional ? "Fractional Property created!" : "Property created!"
        }`
      );
      
      setForm({
        name: '',
        fullLegalName: '',
        propertyDocument: null,
        category: '',
        description: '',
        location: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        bedroom: '',
        bathroom: '',
        built: '',
        squarefit: '',
        price: '',
        images: [],
        isFractional: false,
        fractionCount: 0,
      });
    } catch (err) {
      console.error(err);
      alert('Failed to create property.');
    }
    setUploading(false);
  };
  

  return (
    <>
      <Navigation/>
      <div className="form-container">
        <h1>Create New Property</h1>

        <div className="form-grid">
          {/* Name */}
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={form.name}
                placeholder="Property Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Full Legal Name */}
            <div className="form-group">
              <label>Full Legal Name(Owner)</label>
              <input
                type="text"
                value={form.fullLegalName}
                placeholder="Owner's Full Legal Name"
                onChange={(e) => setForm({ ...form, fullLegalName: e.target.value })}
              />
            </div>
          </div>

          {/* Property Document */}
          <div className="form-row">
            <div className="form-group">
              <label>Property Document</label>
              <input
                type="file"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={form.category}
                placeholder="Category (e.g., Apartment, House)"
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={form.location}
                placeholder="Location"
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                value={form.city}
                placeholder="City"
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={form.description}
                placeholder="Description"
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                value={form.state}
                placeholder="State"
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                value={form.country}
                placeholder="Country"
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>ZipCode</label>
              <input
                type="number"
                value={form.zipCode}
                placeholder="ZipCode"
                onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Bedroom</label>
              <input
                type="number"
                value={form.bedroom}
                placeholder="Bedrooms"
                onChange={(e) => setForm({ ...form, bedroom: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Bathroom</label>
              <input
                type="number"
                value={form.bathroom}
                placeholder="Bathrooms"
                onChange={(e) => setForm({ ...form, bathroom: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Year Built</label>
              <input
                type="number"
                value={form.built}
                placeholder="Year Built"
                onChange={(e) => setForm({ ...form, built: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Square Feet</label>
              <input
                type="number"
                value={form.squarefit}
                placeholder="Square Feet"
                onChange={(e) => setForm({ ...form, squarefit: e.target.value })}
              />
            </div>
          </div>

          {/* Fractional Ownership */}
          <div className="form-row">
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={form.isFractional}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isFractional: e.target.checked,
                      fractionCount: e.target.checked ? form.fractionCount : 0,
                    })
                  }
                />{" "}
                Enable Fractional Ownership
              </label>
            </div>
          </div>

          {form.isFractional && (
            <div className="form-row">
              <div className="form-group">
                <label>Number of Fractions</label>
                <input
                  type="number"
                  value={form.fractionCount}
                  placeholder="e.g. 1000"
                  min={1}
                  onChange={(e) =>
                    setForm({ ...form, fractionCount: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          )}

          {/* Price */}
          <div className="form-row">
            <div className="form-group">
              <label>Price (ETH)</label>
              <input
                type="number"
                value={form.price}
                placeholder="Price (ETH)" step="0.01"
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
          </div>

          {/* Images */}
          <div className="form-row">
            <div className="form-group">
              <label>Images</label>
              <input
                type="file"
                multiple
                onChange={(e) => setForm({ ...form, images: Array.from(e.target.files) })}
              />
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} disabled={uploading} className="submit-button">
          {uploading ? 'Uploading...' : 'Create Property'}
        </button>
      </div>
    </>
  );
};

export default CreateProperty;
