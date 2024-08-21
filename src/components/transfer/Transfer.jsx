import React, { useState } from "react";
import "./Transfer.css";
import { ethers } from "ethers";
import Card from "../card/Card";

function Transfer() {
  const PRIVATE_KEY = import.meta.env.VITE_APP_PRIVATE_KEY;
  const provider_Metamask = new ethers.providers.Web3Provider(window.ethereum);

  const [Loading, setLoading] = useState(false);
  const [list,setList] = useState([]);

  const handleButton2 = async () => {
    const latest_block = await provider_Metamask.getBlockNumber("latest");
    setBlockNumber(latest_block);
  };
  const handleSubmitWeb3 = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.target);
    const address = data.get("address");
    const amount = data.get("amount");
    try {
      sendTransaction(address, amount);
    }
    catch (error) { 
      console.error("Error sending transaction: ", error);
      setLoading(false);
    }
  };
  const sendTransaction = async (address, amount, signer = null) => {
    try {
      if (signer == null) {
        if (!window.ethereum) {
          console.error("No wallet found!");
          setError("No wallet found! Please install MetaMask.");
          return;
        }
        
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner(); // Assign to `signer` variable if null
      }

      const tx = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount),
      });
      
      if (signer == null) {
        console.log("tx1", tx);
        setTxSent("Transaction initiated! Tx hash: " + tx.hash);
      } else {
        console.log("tx2", tx);
      }
      
      const p = {
        address: address,
        amount: amount,
      };
      console.log(p);
      setList(prevList => [...prevList, p]); 

    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setLoading(false); 
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
            {Loading ? (<p>Loading....</p>):(<input type="submit" value="Send"  />)}
            
          </form>
        </div>
      </header>
      <div className="cardList">
        {list.map((item, index) => (
          <Card key={index} address={item.address} amount={item.amount} />
        ))}
      </div>
    </div>
  );
}

export default Transfer;