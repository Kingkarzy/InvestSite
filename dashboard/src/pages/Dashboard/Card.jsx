/* eslint-disable react/prop-types */
const Card = ({ logo, heading, value }) => {
  return (
    <div className='w-1/4 flex flex-col justify-center items-center gap-2 bg-white p-5'>
      <div>{logo}</div>
      <h1 className='uppercase'>{heading}</h1>
      <div className='mt-3 text-base'>{value}</div>
    </div>
  );
};

export default Card;
