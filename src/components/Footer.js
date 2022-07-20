import '../styles/Footer.css';
import Linkedinlogo from '../images/logos_linkedin-icon.png';
import Githublogo from '../images/akar-icons_github-fill.png';
import Emailogo from '../images/carbon_email.png';

const Footer = () => {



    return (
        <div className='footer-container'>
            <footer>
            <p className='footer-text'> Contacts </p>
                <ul className='footer-items'>
                    <li>
                        <div className='logo-list'>
                            <a href="www.linkedin.com/in/sfraley-developer"><img src={Linkedinlogo} alt="LinkedIn profile link"></img></a>
                            <a href="https://github.com/msjupiter96"><img src={Githublogo} alt="Github profile link"></img></a>
                            <a href="mailto:fraleysn@gmail.com?subject=Message from Fishing App"><img src={Emailogo} alt="Email link"></img></a>
                        </div>
                    </li>
                </ul>
            </footer>
        </div>
    )

};


export default Footer;
