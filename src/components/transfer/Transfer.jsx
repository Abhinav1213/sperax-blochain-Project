import React, { useState } from "react";
import "./Transfer.css";
import { ethers } from "ethers";


function Transfer() {
  const PRIVATE_KEY = import.meta.env.VITE_APP_PRIVATE_KEY;
  const provider_Metamask = new ethers.providers.Web3Provider(window.ethereum);

  const [blockNumber, setBlockNumber] = useState(null);
  const [txSent, setTxSent] = useState(null);
  const [txSentInfura, setTxSentInfura] = useState(null);
  const handleButton1 = async () => {
    const latest_block = await infuraProvider.getBlockNumber("latest");
    setBlockNumber(latest_block);
  };

  const handleButton2 = async () => {
    const latest_block = await provider_Metamask.getBlockNumber("latest");
    setBlockNumber(latest_block);
  };
  const handleSubmitWeb3 = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const address = data.get("address");
    const amount = data.get("amount");
    sendTransaction(address, amount);
  };
  const sendTransaction = async (address, amount, signer = null) => {
    if (signer == null) {
      if (!window.ethereum) console.error("No wallet found!");
      else {
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tx = await signer.sendTransaction({
          to: address,
          value: ethers.utils.parseEther(amount),
        });
        console.log("tx", tx);
        setTxSent("Transaction initiated! Tx hash: " + tx.hash);
      }
    } 
    else {
      const tx = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount),
      });
      console.log("tx", tx);
      setTxSentInfura("Transaction initiated! Tx hash: " + tx.hash);
    }
  };

  return (
    <div className="Transfer">
      <header className="Transfer-header">
        <h3> Fill out the form to send a transaction via Web3Provider: </h3>
        <div>
          <form onSubmit={handleSubmitWeb3}>
            <input type="text" name="address" placeholder="Recipient Address" />
            <input type="text" name="amount" placeholder="Amount (ETH)" />
            <input type="submit" value="Send" />
          </form>
        </div>
      </header>
    </div>
  );
}

export default Transfer;