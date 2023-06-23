/* eslint-disable react/prop-types */
const PriceCard = ({
  heading,
  price,
  range,
  percent,
  duration,
  refer,
  content,
  width,
  height,
}) => {
  return (
    <div
      className="text-black flex flex-col justify-center items-center border-solid mb-10 bg-gray-300 shadow-xl p-5 mx-auto  transition-all rounded-xl"
      style={{
        width: width,
        height: height,
      }}
    >
      <span className="flex font-semibold scale-[2] mb-5 text-dark dark:text-black">
        {heading}
      </span>
      <div className="flex gap-2 ">
        <h1 className="text-5xl lg:text-5xl font-bold text-center text-dark mb-5">
          {price}
        </h1>
        <span className="font-semibold text-base mt-5">{range}</span>
      </div>
      <p className="mb-3">{percent}</p>
      <p className="mb-3">{duration}</p>
      <p className="mb-3">{refer}</p>
      <p className="text-sm mb-5 font-light text-center text-dark">{content}</p>
      <button className="background-indigo-gradient text-white w-full hover:scale-75">
        Get Started
      </button>
    </div>
  );
};

export default PriceCard;
