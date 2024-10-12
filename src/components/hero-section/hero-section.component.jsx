import './hero-section.styles.scss';
import HeroSectionImage from '../../assets/cyber-attack (1).png';
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const HeroSection=()=>{

    const navigateRouter = useNavigate();

    return(
        <section className="hero-section">
            <div>
                <p>Analyzing Malicious Files Made Easy</p>
                <p>our malicious scanner scanner scanner scanner scannerscanner scanner scanner scanner scanner scanner </p>
                <button onClick={()=>{navigateRouter('/scan')}} >Open Scanner <FaArrowRight className='icon-arrow' /> </button>
            </div>
            <div>
                <img  src={HeroSectionImage}  />
            </div>
        </section>
    )
}
export default HeroSection;