import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section company-info">
          <h3>ShopSphere</h3>
          <p>
            Premium fashion curated for modern lifestyle. Explore, shop, and
            experience a new level of style.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/search">Shop</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section support">
          <h4>Support</h4>
          <ul>
            <li>
              <Link to="/search">Products</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h4>Subscribe</h4>
          <p>Get the latest deals, news, and updates.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>

          {/* Social Icons */}
          <div className="social-icons">
             <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
