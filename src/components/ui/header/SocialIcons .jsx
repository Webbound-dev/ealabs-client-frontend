import instagram from "../../../assets/img/instagram.png";
import facebook from "../../../assets/img/facebook.png";
import youtube from "../../../assets/img/youtube.png";
import Image from "../common/Image";

const SocialIcons = () => (
  <div className="flex space-x-2">
    
    <a 
      href="https://www.instagram.com/ealabs.official/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={instagram}
        alt="Instagram"
        className="w-6 h-6 rounded-full object-cover cursor-pointer"
      />
    </a>

    <a 
      href="https://www.facebook.com/p/Endocrine-and-Allergy-Laboratory-61562847367454/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={facebook}
        alt="Facebook"
        className="w-6 h-6 rounded-full object-cover cursor-pointer"
      />
    </a>
    <a 
      href="https://www.youtube.com/@EndocrineLaboratory-India"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={youtube}
        alt="youtube"
        className="w-6 h-6 rounded-full object-cover cursor-pointer"
      />
    </a>


  </div>
);

export default SocialIcons;
