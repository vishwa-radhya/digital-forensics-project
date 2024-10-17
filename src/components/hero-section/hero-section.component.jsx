import './hero-section.styles.scss';
import HeroSectionImage from '../../assets/cyber-attack (1).png';
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa6';

const HeroSection=()=>{

    const navigateRouter = useNavigate();

    return(
        <section className="hero-section">
            <div>
                <p>Analyzing Malicious Files Made Easy</p>
                <p>Welcome to Malware Analyzer, your go-to solution for efficient and accurate malware detection and analysis. Our platform leverages advanced sandboxing techniques and powerful automation tools to provide in-depth reports on suspicious files and potential threats.</p>
                <button onClick={()=>{navigateRouter('/scan')}} >Open Scanner <FaArrowRight className='icon-arrow' /> </button>
                <a className='ghub' href='https://github.com/vishwa-radhya/digital-forensics-project.git' target='_blank'><FaGithub/> Source Code </a>
            </div>
            <div>
                <img  src={HeroSectionImage}  />
            </div>
        </section>
    )
}
export default HeroSection;