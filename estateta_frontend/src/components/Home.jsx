 

import { Link } from 'react-router-dom';


const Home = () =>{
    return(
 
        <><section className="hero" id="home">
            <div className="container">
                <div className="hero-content">
                    <p className="hero-subtitle">
                        <ion-icon name="home"></ion-icon>
                        <span>Real Estate Agency</span>
                    </p>
                    <h2 className="h1 hero-title">Find Your Dream House By Us</h2>
                    <p className="hero-text">
                    Real estate was built for the few—we’re opening it up to the many.                    </p>
                    <Link to="/propertylist">  <button class="btn">Explore Properties</button></Link>
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

                        <h2 className="h2 section-title">The Leading Decentralized Real Estate Marketplace.</h2>

                        <p className="about-text">
                        Can’t buy a whole property? No problem—own a share, earn your part of the profit.
                        Fractional ownership opens the door for anyone to become a real estate investor.
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
                            "Say goodbye to paperwork. Say hello to trustless, automated real estate."
                        </p>

                        <a href="#service" className="btn">Our Services</a>

                    </div>

                </div>
            </section></>  


    )
}
export default Home;