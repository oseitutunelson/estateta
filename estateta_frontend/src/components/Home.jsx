import { createAppKit } from '@reown/appkit/react'
import { useState, useEffect } from 'react'; 
import { ethers, Contract} from 'ethers'
 
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet ,polygonAmoy,polygon} from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { Link } from 'react-router-dom';
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
 

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = '2adfca29ecc73c623bd3ed49c7b66ec7'

// 2. Create a metadata object - optional
const metadata = {
  name: 'matex',
  description: 'matex',
  url: 'https://matex-two.vercel.app', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks
const networks = [mainnet, arbitrum,polygonAmoy]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})



const Home = () =>{
    return(
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>

        <><section className="hero" id="home">
            <div className="container">
                <div className="hero-content">
                    <p className="hero-subtitle">
                        <ion-icon name="home"></ion-icon>
                        <span>Real Estate Agency</span>
                    </p>
                    <h2 className="h1 hero-title">Find Your Dream House By Us</h2>
                    <p className="hero-text">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                    </p>
                    <w3m-button/>

                </div>
                <figure className="hero-banner">
                    <img src="/images/hero-banner.png" alt="Modern house model" className="w-100" />
                </figure>
            </div>
        </section><section className="about" id="about">
                <div className="container">

                    <figure className="about-banner">
                        <img src="/images/about-banner-1.png" alt="House interior" />

                        <img src="/images/about-banner-2.jpg" alt="House interior" className="abs-img" />
                    </figure>

                    <div className="about-content">

                        <p className="section-subtitle">About Us</p>

                        <h2 className="h2 section-title">The Leading Real Estate Rental Marketplace.</h2>

                        <p className="about-text">
                            Over 39,000 people work for us in more than 70 countries all over the This breadth of global coverage,
                            combined with
                            specialist services
                        </p>

                        <ul className="about-list">

                            <li className="about-item">
                                <div className="about-item-icon">
                                    <ion-icon name="home-outline"></ion-icon>
                                </div>

                                <p className="about-item-text">Smart Home Design</p>
                            </li>

                            <li className="about-item">
                                <div className="about-item-icon">
                                    <ion-icon name="leaf-outline"></ion-icon>
                                </div>

                                <p className="about-item-text">Beautiful Scene Around</p>
                            </li>

                            <li className="about-item">
                                <div className="about-item-icon">
                                    <ion-icon name="wine-outline"></ion-icon>
                                </div>

                                <p className="about-item-text">Exceptional Lifestyle</p>
                            </li>

                            <li className="about-item">
                                <div className="about-item-icon">
                                    <ion-icon name="shield-checkmark-outline"></ion-icon>
                                </div>

                                <p className="about-item-text">Complete 24/7 Security</p>
                            </li>

                        </ul>

                        <p className="callout">
                            "Enimad minim veniam quis nostrud exercitation
                            llamco laboris. Lorem ipsum dolor sit amet"
                        </p>

                        <a href="#service" className="btn">Our Services</a>

                    </div>

                </div>
            </section></>    </WagmiProvider>


    )
}
export default Home;