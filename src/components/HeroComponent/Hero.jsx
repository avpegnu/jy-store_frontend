import hand_icon from "../../assets/hand_icon.png";
import arrow_icon from "../../assets/arrow.png";
import hero1_image from "../../assets/hero1_image.png";
import "./Hero.css";

const Hero = () => {
  return (
    <div
      className="hero h-screen bg-gradient-to-b from-[#223179] to-[#7f8be722] flex"
      style={{ fontFamily: "Sen" }}
    >
      {/* Left Section */}
      <div className="hero-left flex-1 flex flex-col justify-center gap-5 pl-44 leading-tight">
        <h2 className="text-[#090909] text-2xl font-semibold">
          NEW ARRIVALS ONLY
        </h2>
        <div>
          <div className="hero-hand-icon flex items-center gap-5">
            <p className="text-[#171717] text-[100px] font-bold">new</p>
            <img src={hand_icon} alt="hand icon" className="w-[105px]" />
          </div>
          <p className="text-[#171717] text-[100px] font-bold">collections</p>
          <p className="text-[#171717] text-[100px] font-bold">for everyone</p>
        </div>
        <div className="hero-latest-btn flex justify-center items-center gap-4 w-[310px] h-[70px] rounded-full mt-8 bg-[#2b2264] text-white text-xl font-medium cursor-pointer hover:bg-[#211e33]">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="arrow icon" />
        </div>
      </div>
      {/* Right Section */}
      <div className="hero-right flex-1 flex items-center justify-center">
        <img src={hero1_image} alt="hero" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default Hero;
