import React from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/img/EA-Lab_Logo_Web.png";
import Image from "../common/Image";

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div
      onClick={handleLogoClick}
      className="
        cursor-pointer 
        flex items-center 
        h-10 md:h-12 lg:h-14 
        w-auto 
        max-w-40 sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px]
      "
    >
      <Image
        src={logoImg}
        alt="EA Lab Logo"
        className="h-full w-auto object-contain"
      />
    </div>
  );
};

export default Logo;
