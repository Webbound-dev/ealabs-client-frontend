import Image from "../../common/Image";

const CheckupCard = ({ imageUrl, title, Price, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer h-full"
  >
    <div className="overflow-hidden rounded-t-xl">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>

    <div className="p-2 flex flex-col grow items-center">
      <h3 className="text-sm md:text-md lg:text-lg font-semibold text-gray-800 mb-2 text-center">
        {title}
      </h3>
      
      <div className="mt-auto">
        <span className="text-lg md:text-xl lg:text-2xl font-bold text-indigo-900">{Price}</span>
      </div>
    </div>
  </div>
);

export default CheckupCard;