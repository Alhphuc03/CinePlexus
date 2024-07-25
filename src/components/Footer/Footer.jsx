import "./Footer.css";
import { FaFacebook, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <a
          href="https://www.facebook.com/profile.php?id=61551039560313"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="icon-footer" />
        </a>
        <a
          href="https://github.com/Alhphuc03"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="icon-footer" />
        </a>
      </div>
      <ul>
        <li>
          <a href="/">About Us</a>
        </li>
        <li>
          <a href="/">Contact Us</a>
        </li>
        <li>
          <a href="/">Privacy Policy</a>
        </li>
        <li>
          <a href="/">Terms of Service</a>
        </li>
        <li>
          <a href="/">FAQ</a>
        </li>
        <li>
          <a href="/">Careers</a>
        </li>
        <li>
          <a href="/">Media</a>
        </li>
        <li>
          <a href="/">Partnerships</a>
        </li>
        <li>
          <a href="/">Feedback</a>
        </li>
      </ul>
      <p className="copyright-text">© 2024 CinePlexus, Inc.</p>
    </div>
  );
};

export default Footer;
