import "./footer.css";
import footer_logo from "../../assets/logo.png";
import instagram_icon from "../../assets/instagram_icon.png";
import pinterest_icon from "../../assets/pinterest_icon.png";
// import facebook_icon from "../assets/facebook_icon.png";
import whatsapp_icon from "../../assets/whatsapp_icon.png";
const Footer = () => {
  return (
    <div className="footer" style={{ fontFamily: "Roboto" }}>
      <div className="footer-logo">
        <img src={footer_logo} alt="logo" style={{ width: "25%" }} />
        <p>JYSTORE</p>
      </div>
      <ul className="footer-links">
        <li>Công ty</li>
        <li>Sản phẩm</li>
        <li>Văn phòng</li>
        <li>Về chúng tôi</li>
        <li>Liên hệ</li>
      </ul>

      <div className="footer-social-icon" >
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2025 - JYSTORE. Powered by NVA</p>
      </div>
    </div>
  );
};

export default Footer;

//Use tailwind:

// import footer_logo from "../../assets/logo.png";
// import instagram_icon from "../../assets/instagram_icon.png";
// import pinterest_icon from "../../assets/pinterest_icon.png";
// import whatsapp_icon from "../../assets/whatsapp_icon.png";

// const Footer = () => {
//   return (
//     <div className="flex flex-col items-center justify-center gap-12 bg-gradient-to-b from-[#2e3e8e] to-[#ececf022] mt-12 py-10">
//       <div className="flex items-center justify-center gap-5">
//         <img src={footer_logo} alt="logo" className="w-1/4" />
//         <p className="text-[46px] font-bold text-[#00005E]">JYSTORE</p>
//       </div>
//       <ul className="flex gap-12 text-[#252525] text-lg">
//         <li className="cursor-pointer">Company</li>
//         <li className="cursor-pointer">Products</li>
//         <li className="cursor-pointer">Offices</li>
//         <li className="cursor-pointer">About us</li>
//         <li className="cursor-pointer">Contact</li>
//       </ul>
//       <div className="flex gap-5">
//         <div className="p-2 bg-[#fbfbfb] border border-[#ebebeb]">
//           <img src={instagram_icon} alt="Instagram" />
//         </div>
//         <div className="p-2 bg-[#fbfbfb] border border-[#ebebeb]">
//           <img src={pinterest_icon} alt="Pinterest" />
//         </div>
//         <div className="p-2 bg-[#fbfbfb] border border-[#ebebeb]">
//           <img src={whatsapp_icon} alt="WhatsApp" />
//         </div>
//       </div>
//       <div className="flex flex-col items-center gap-7 w-full text-[#1a1a1a] text-lg">
//         <hr className="w-4/5 border-none rounded-lg h-[3px] bg-[#c7c7c7]" />
//         <p>Copyright @ 2025 - All Right Reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default Footer;
