import '../styles/Footer.css';

const Footer = () => {



    return (
        <div className='footer-container'>
            <footer>
            <p className='footer-text'> Contacts </p>
                <ul className='footer-items'>
                    <li>
                        <div className='logo-list'>
                            <a href="www.linkedin.com/in/sfraley-developer"><img src='/images/logos_linkedin-icon.png' alt="LinkedIn profile link"></img></a>
                            <a href="https://github.com/msjupiter96"><img src='images/akar-icons_github-fill.png' alt="Github profile link"></img></a>
                            <a href="mailto:fraleysn@gmail.com?subject=Message from Fishing App"><img src='images/carbon_email.png' alt="Email link"></img></a>
                        </div>
                    </li>
                </ul>
            </footer>
        </div>
    )

};


export default Footer;