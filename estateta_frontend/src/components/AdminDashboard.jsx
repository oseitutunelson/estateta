import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import estatetaAbi from "../contracts/Estateta.sol/Estateta.json";
import "../styles/admin-dashboard.css";

const CONTRACT_ADDRESS = "0x5cA7FBA1A6EB53Bb0D37738cBFf9BDdBF1862861";

export default function AdminPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);

  const loadProperties = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, estatetaAbi.abi, provider);
      const allProps = await contract.getAllProperties();

      // Convert bigints to strings and keep doc hash
      const formattedProps = allProps.map((p) => ({
        id: p.id.toString(),
        name: p.name,
        owner: p.owner,
        propertyDocument: p.propertyDocument,
        verified: p.verified,
      }));
      

      setProperties(formattedProps);
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  };

  const verifyProperty = async (propertyId) => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask");
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, estatetaAbi.abi, signer);
      const tx = await contract.setPropertyVerification(propertyId, true);
      await tx.wait();
      alert("✅ Property verified successfully!");
      loadProperties();
    } catch (error) {
      console.error(error);
      alert("❌ Error verifying property.");
    } finally {
      setLoading(false);
    }
  };

  const viewDocument = (hash) => {
    if (!hash) {
      alert("No document uploaded for this property.");
      return;
    }
    window.open(`${hash}`, "_blank");
  };

  useEffect(() => {
    connectWallet();
    loadProperties();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Verification Panel</h2>
        <p>Connected Admin: {account}</p>
      </div>

      {loading && <p className="status-loading">Transaction in progress...</p>}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Property ID</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Document</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties
              .filter((p) => !p.verified)
              .map((p, index) => (
                <tr key={index}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.owner}</td>
                  <td>
                    <button
                      className="view-doc-btn"
                      onClick={() => viewDocument(p.propertyDocument)}
                    >
                      View Document
                    </button>
                  </td>
                  <td>
                    <span className="status-badge status-pending">Pending</span>
                  </td>
                  <td>
                    <button
                      className="verify-btn"
                      onClick={() => verifyProperty(p.id)}
                      disabled={loading}
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
