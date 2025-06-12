
const Footer = () =>{
    return(
        <footer className="footer">
        <div className="footer-top">
          <div className="container">
            <div className="footer-brand">
              <a href="#" className="logo" style={{ fontSize: '3rem' }}>
              Proprietà
              </a>
              <p className="section-text">
              Think of property like Netflix subscriptions: pay monthly, earn passively. Except this time, you own a piece of the action.              </p>
              <ul className="contact-list">
                <li>
                  <a href="#" className="contact-link">
                    <ion-icon name="location-outline"></ion-icon>
                    <address>Newport, Rhode Island</address>
                  </a>
                </li>
                <li>
                  <a href="tel:+0123456789" className="contact-link">
                    <ion-icon name="call-outline"></ion-icon>
                    <span>+233 501597710</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@homeverse.com" className="contact-link">
                    <ion-icon name="mail-outline"></ion-icon>
                    <span>proprietà@icloud.com</span>
                  </a>
                </li>
              </ul>
              <ul className="social-list">
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-linkedin"></ion-icon>
                  </a>
                </li>
                <li>
                  <a href="#" className="social-link">
                    <ion-icon name="logo-youtube"></ion-icon>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-link-box">
              <ul className="footer-list">
                <li><p className="footer-list-title">Company</p></li>
                <li><a href="#" className="footer-link">About</a></li>
                <li><a href="#" className="footer-link">Blog</a></li>
                <li><a href="#" className="footer-link">All Products</a></li>
                <li><a href="#" className="footer-link">Locations Map</a></li>
                <li><a href="#" className="footer-link">FAQ</a></li>
                <li><a href="#" className="footer-link">Contact us</a></li>
              </ul>
              <ul className="footer-list">
                <li><p className="footer-list-title">Services</p></li>
                <li><a href="#" className="footer-link">Order tracking</a></li>
                <li><a href="#" className="footer-link">Wish List</a></li>
                <li><a href="#" className="footer-link">Login</a></li>
                <li><a href="#" className="footer-link">My account</a></li>
                <li><a href="#" className="footer-link">Terms & Conditions</a></li>
                <li><a href="#" className="footer-link">Promotional Offers</a></li>
              </ul>
              <ul className="footer-list">
                <li><p className="footer-list-title">Customer Care</p></li>
                <li><a href="#" className="footer-link">Login</a></li>
                <li><a href="#" className="footer-link">My account</a></li>
                <li><a href="#" className="footer-link">Wish List</a></li>
                <li><a href="#" className="footer-link">Order tracking</a></li>
                <li><a href="#" className="footer-link">FAQ</a></li>
                <li><a href="#" className="footer-link">Contact us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p className="copyright">
              &copy; 2025 <a href="#">proprietà</a>. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    )
}
export default Footer;