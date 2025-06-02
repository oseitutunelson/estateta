import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { Navigation } from './Navigation';
import '../styles/createproperty.css';
import contractAbi from '../contracts/Estateta.sol/Estateta.json';
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";


const CONTRACT_ADDRESS = '0xc6dE357BD6A7e1c5Fd648A1ef0b1fa137F8455a1';

const CreateProperty = () => {
  const { address, isConnected } = useAppKitAccount();

  const [form, setForm] = useState({
    name: '',
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
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async () => {
    const imageUrls = [];

    for (let file of form.images) {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: "d6ae73950b028dc4543d",
          pinata_secret_api_key: "67e454a8c498bf67dd67ca30bdc154db426bd885d9928714efc0a4b5ee86cd42",
        },
      });

      imageUrls.push(`https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`);
    }

    return imageUrls;
  };

  const handleSubmit = async () => {
    

    try {
      const imageUrls = await handleImageUpload();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

      const property = {
        id: 0,
        owner: address,
        name: form.name,
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
        price: ethers.parseEther(form.price),
        sold: false,
        deleted: false,
      };
      console.log(property)

      const tx = await contract.createProperty(property);
      await tx.wait();

      alert('Property created!');
      setForm({ ...form, images: [] });
    } catch (err) {
      console.error(err);
      alert('Failed to create property.');
    }

    setUploading(false);
  };
      return(
        <>
        <Navigation/>
        <div className="form-container">
    <h1>Create New Property</h1>

    <div className="form-grid">
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

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={form.category}
            placeholder="Category (e.g., Apartment, House)"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={form.location}
            placeholder="Location"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            value={form.city}
            placeholder="City"
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>
      </div>

 
      <div className="form-row">
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={form.description}
            placeholder="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            value={form.state}
            placeholder="State"
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />
        </div>
      </div>
      <div className="form-row">
      <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            value={form.country}
            placeholder="Country"
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>ZipCode</label>
          <input
            type="number"
            value={form.zipCode}
            placeholder="ZipCode"
            onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
          />
        </div>
      </div>
      <div className="form-row">
      <div className="form-group">
          <label>Bedroom</label>
          <input
            type="number"
            value={form.bedroom}
            placeholder="Bedrooms"
            onChange={(e) => setForm({ ...form, bedroom: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Bathroom</label>
          <input
            type="number"
            value={form.bathroom}
            placeholder="Bathrooms"
            onChange={(e) => setForm({ ...form, bathroom: e.target.value })}
          />
        </div>
      </div>
      <div className="form-row">
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
      <div className="form-row">
      <div className="form-group">
          <label>Price(ETH)</label>
          <input
            type="number"
            value={form.price}
            placeholder="Price (ETH)" step="0.01"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
         
      </div>
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
    )
}
export default CreateProperty;