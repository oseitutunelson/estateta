import { Link } from 'react-router-dom';

const Service = () =>{
    return(

      <section className="service" id="service">
      <div className="container">

        <p className="section-subtitle">Our Services</p>

        <h2 className="h2 section-title">Our Main Focus</h2>

        <ul className="service-list">

          <li>
            <div className="service-card">

              <div className="card-icon">
                <img src="/images/service-1.png" alt="Service icon"/>
              </div>

              <h3 className="h3 card-title">
                <a href="#">Buy a home</a>
              </h3>

              <p className="card-text">
                over 1 million+ homes for sale available on the website, we can match you with a house you will want
                to call home.
              </p>

              <a href="/propertylist" className="card-link">
                <span>Find A Home</span>

                <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>

            </div>
          </li>

          <li>
            <div className="service-card">

              <div className="card-icon">
                <img src="/images/service-2.png" alt="Service icon"/>
              </div>

              <h3 className="h3 card-title">
                <a href="#">Tokenize Your Property</a>
              </h3>

              <p className="card-text">
              Mint ERC-721 or ERC-1155 NFTs representing ownership fractions and start trading.
              </p>

              <a href="/createproperty" className="card-link">
                <span>Tokenize A Home</span>

                <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>

            </div>
          </li>

          <li>
            <div className="service-card">

              <div className="card-icon">
                <img src="/images/service-3.png" alt="Service icon"/>
              </div>

              <h3 className="h3 card-title">
                <a href="#">Sell a home</a>
              </h3>

              <p className="card-text">
              Sell fractions of your property to raise capital without giving up full ownership.
              or sell the full property to raise capital
              </p>

              <a href="/createproperty" className="card-link">
                <span>Sell A Home</span>

                <ion-icon name="arrow-forward-outline"></ion-icon>
              </a>

            </div>
          </li>

        </ul>

      </div>
    </section>
    )
}
export default Service;