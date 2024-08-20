import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import './Wallet.css';

function Wallet() {
	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState(null);
	const [provider, setProvider] = useState(null);
	const [network, setNetwork] = useState(null);
	const [price, setPrice] = useState(null);

	useEffect(() => {
		if (window.ethereum) {
			initializeProvider();
			window.ethereum.on('accountsChanged', handleAccountsChanged);
			window.ethereum.on('chainChanged', handleChainChanged);
		}

		return () => {
			if (window.ethereum) {
				window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
				window.ethereum.removeListener('chainChanged', handleChainChanged);
			}
		};
	}, []);

	useEffect(() => {
		if (provider) {
			connectWallet();
		}
	}, [provider]);

	const getTokenPrice = async (tokenId) => {
		try {
			const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`);
			setPrice(response.data[tokenId].usd);
		} catch (error) {
			console.error("Error fetching price data:", error);
			return null;
		}
	};

	const initializeProvider = () => {
		const newProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(newProvider);
	};

	const connectWallet = async () => {
		if (provider) {
			try {
				await provider.send("eth_requestAccounts", []);
				const signer = provider.getSigner();
				const address = await signer.getAddress();
				setAccount(address);
				await refreshBalance(address);
				await getNetwork();
			} catch (error) {
				console.error("Failed to connect wallet:", error);
				alert('Please integrate your MetaMask first');
			}
		} else {
			console.log("Provider not initialized.");
		}
	};

	const disconnectWallet = () => {
		setAccount(null);
		setBalance(null);
		setNetwork(null);
		setProvider(null);
	};

	const refreshBalance = async (address) => {
		if (provider) {
			const balance = await provider.getBalance(address);
			setBalance(ethers.utils.formatEther(balance));
		}
	};

	const handleAccountsChanged = async (accounts) => {
		if (accounts.length > 0) {
			setAccount(accounts[0]);
			await refreshBalance(accounts[0]);
		} else {
			disconnectWallet();
		}
	};

	const handleChainChanged = async () => {
		initializeProvider();
	};

	const getNetwork = async () => {
		if (provider) {
			const network = await provider.getNetwork();
			setNetwork(network.name);
		}
	};

	return (
		<div className='wallet-container'>
			{account ? (
				<div className="wallet-details">
					<table>
						<tbody>
							<tr>
								<th>Connected Account</th>
								<td>{account}</td>
							</tr>
							<tr>
								<th>Balance</th>
								<td>{balance} ETH</td>
							</tr>
							<tr>
								<th>Current Network</th>
								<td>{network}</td>
							</tr>
							<tr>
								<td colSpan="2" align="center">
									<button className="refresh-button" onClick={() => refreshBalance(account)}>
										Refresh Balance
									</button>
								</td>
							</tr>
							<tr>
								<td colSpan="2" align="center">
									<button className="disconnect-button" onClick={disconnectWallet}>
										Disconnect Wallet
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			) : (
				<div className='wallet-connect'>
					<h5>Looks like you haven't connected your Wallet!</h5>
					<button className="connect-button" onClick={initializeProvider}>
						Connect MetaMask
					</button>
				</div>
			)}
		</div>
	);
}

export default Wallet;
