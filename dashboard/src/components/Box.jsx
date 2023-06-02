/* eslint-disable react/prop-types */

const Box = ({ children }) => {
  return (
    <div className='w-4/5 h-auto mx-auto bg-white p-5 flex flex-col rounded-sm shadow-2xl'>
      {children}
    </div>
  );
};
export default Box;

export const UseBox = ({ width, height, children }) => {
  return (
    <div
      className='border border-black rounded-sm shadow-xl'
      width={width}
      height={height}
    >
      {children}
    </div>
  );
};
