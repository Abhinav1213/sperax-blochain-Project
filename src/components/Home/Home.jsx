import React from 'react'
import Wallet from '../Wallet/Wallet';
import CryptoTable from '../CryptoTable/CryptoTable';
import Transfer from '../transfer/Transfer';
import "./Home.css"
const Home = () => {
  return (
    <>
      
      <div>
          <div className='w-full'>
        <span className='transaction'>
            <Wallet />
            <Transfer />
        </span>
            <CryptoTable />
          </div>
        </div>
      
    </>
  )
}

export default Home;