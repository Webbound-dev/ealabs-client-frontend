import { useNavigate } from "react-router-dom";

const BottomBar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        mt-8 pt-8 border-t border-gray-700 
        flex flex-col md:flex-row 
        justify-between items-center 
        text-sm text-gray-400 gap-4
      "
    >
      <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:order-2">
        <div
          onClick={() => navigate("/privacy-policy")}
          className="hover:text-white transition cursor-pointer"
        >
          Privacy Policy
        </div>

        <div
          onClick={() => navigate("/shipping-policy")}
          className="hover:text-white transition cursor-pointer"
        >
          Shipping Policy
        </div>

        <div
          onClick={() => navigate("/terms-conditions")}
          className="hover:text-white transition cursor-pointer"
        >
          Terms &amp; Condition
        </div>
        <div
          onClick={() => navigate("/refund-cancellation-policy")}
          className="hover:text-white transition cursor-pointer"
        >
          Refund Cancellation Policy
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-1 text-center md:text-left md:order-1 leading-tight">
        <div>© {new Date().getFullYear()} EA Labs. All rights reserved.</div>
        <div> Developed by Antinoob Solutions</div>
      </div>
    </div>
  );
};

export default BottomBar;
