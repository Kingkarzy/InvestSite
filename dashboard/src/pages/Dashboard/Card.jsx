/* eslint-disable react/prop-types */
export const NewCard = ({ logo, heading, value, check }) => {
  return (
    <div className=''>
      <div>{logo}</div>
      <h1 className='uppercase'>{heading}</h1>
      <div className='mt-3 text-base'>{value}</div>
      <div>{check}</div>
    </div>
  );
};

const Card = ({ logo, heading, value }) => {
  return (
    <div className='w-[35%] lg:w-3/12 flex flex-col justify-center items-center gap-3 bg-white rounded-lg shadow-2xl m-3 p-3'>
      <div>{logo}</div>
      <h1 className='uppercase'>{heading}</h1>
      <div className='mt-2 text-base'>{value}</div>
    </div>
  );
};
export default Card;
