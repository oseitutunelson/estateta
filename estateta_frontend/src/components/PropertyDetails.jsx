// components/PropertyDetails.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import ContractABI from "../contracts/Estateta.sol/Estateta.json";
import { Navigation } from "./Navigation";
import "../styles/details.css"; // Ensure this is imported

const CONTRACT_ADDRESS = '0x7a5ED69eCe5D4fD41a0FdF9Efc1AF130f44ce3e7';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [sharesToBuy, setSharesToBuy] = useState(1);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      const provider = new ethers.JsonRpcProvider("https://polygon-amoy.drpc.org");
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI.abi, provider);
      const props = await contract.getAllProperties();
      const formatted = props.map((p) => ({
        id: p.id.toString(),
        owner: p.owner,
        name: p.name,
        images: p.images,
        category: p.category,
        description: p.description,
        location: p.location,
        city: p.city,
        state: p.state,
        country: p.country,
        zipCode: p.zipCode.toString(),
        bedroom: p.bedroom.toString(),
        bathroom: p.bathroom.toString(),
        built: p.built.toString(),
        squarefit: p.squarefit.toString(),
        price: ethers.formatEther(p.price),
        sold: p.sold,
        deleted: p.deleted,
        isFractionalized: p.isFractionalized,
        totalShares: p.totalShares.toString(),
      }));

      const selected = formatted.find((p) => p.id === id);
      setProperty(selected);
    }

    fetchProperty();
  }, [id]);

  const handleBuyShares = async () => {
    if (!window.ethereum || !property) return alert("Connect your wallet");

    setBuying(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);

      const pricePerShare = ethers.parseEther(property.price) / BigInt(property.totalShares);
      const totalCost = pricePerShare * BigInt(sharesToBuy);

      const tx = await contract.buyShares(property.id, sharesToBuy, {
        value: totalCost,
      });

      await tx.wait();
      alert("Shares purchased successfully!");
    } catch (err) {
      console.error(err);
      alert("Error buying shares");
    } finally {
      setBuying(false);
    }
  };

  const handleBuyFull = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);
      const totalCost = ethers.parseEther(property.price);
      const tx = await contract.buyProperty(property.id, { value: totalCost });
      await tx.wait();
      alert('Successfully bought full property!');
    } catch (err) {
      console.error('Error buying full property:', err);
      alert('Error buying property.');
    }
  };

  if (!property) return <div>Loading...</div>;

  return (
    <>
    <Navigation />
    <div className="property-details">
      
      <div className="details-container">
        <div className="details-images">
          {property.images.map((img, idx) => (
            <img key={idx} src={img} alt={`Property ${idx}`} />
          ))}
        </div>
        <div className="details-info">
          <h1>{property.name}</h1>
          <p>{property.description}</p>
          <p><strong>Location:</strong> {property.city}, {property.country}</p>
          <p><strong>Bedrooms:</strong> {property.bedroom} | <strong>Bathrooms:</strong> {property.bathroom}</p>
          <p><strong>Built:</strong> {property.built} | <strong>Size:</strong> {property.squarefit} sq ft</p>
          <p><strong>Price:</strong> {property.price} ETH</p>

          {property.isFractionalized && (
            <div className="fractional-section">
              <h3>Fractional Ownership</h3>
              <p>Total Shares: {property.totalShares}</p>
              <input
                type="number"
                value={sharesToBuy}
                onChange={(e) => setSharesToBuy(e.target.value)}
                placeholder="Shares to buy"
              />
              
              <button onClick={handleBuyShares} disabled={buying}className="btn">
                {buying ? "Buying..." : "Buy Shares"}
              </button>
            </div>
          )}

          <button onClick={handleBuyFull}className="btn">Buy Full Property</button>
        </div>
      </div>
    </div>
    </>
  );
}