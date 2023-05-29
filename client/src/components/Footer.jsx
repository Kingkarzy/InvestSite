import { Link } from 'react-router-dom';
// import { Button } from './Button';
import Logo from "../assets/images/black_logo.png";
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subcription-heading'>
          Join the Adventure newsletter to receive our best investors
          deals
        </p>
        <p className='footer-subcription-text'>
          You can unsubcribe at any time.
        </p>
        <br />
        <div className='input-areas'>
          <form>
            <input
              type='email'
              name='email'
              className='footer-input'
              placeholder='Your Email'
            />
            {/* <Button buttonStyle='btn--outline'>Subscribe</Button> */}
          </form>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Destinations</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Media</h2>
            <Link to='/'>Submit Video</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>

      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link
              to='/'
              className='social-logo'
            >
              <img
                src={Logo}
                alt=' '
                className='logo_img'
                width='100'
                height='75'
              />
            </Link>
          </div>
          <small className='website-rights'>
            Copywrite © {currentYear} Investment | All Rights Reserved
          </small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
