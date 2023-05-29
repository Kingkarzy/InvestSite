/* eslint-disable react/prop-types */
const Card = ({ logo, heading, content, width, height }) => {
  return (
    <div
      className="text-black flex flex-col justify-center items-center border-solid bg-white shadow-xl cursor-pointer p-5 hover:scale-110 transition-all rounded-xl"
      style={{
        width: width,
        height: height,
      }}
    >
      <span className="flex scale-[2.5] mb-12 text-dark dark:text-black">
        {logo}
      </span>
      <h1 className="text-xl lg:text-3xl font-semibold text-center text-dark mb-1">
        {heading}
      </h1>
      <p className="text-sm font-light text-center text-dark">{content}</p>
    </div>
  );
};

export default Card;
