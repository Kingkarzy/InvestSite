/* eslint-disable react/prop-types */

export default function MyBtn({ child }) {
  return (
    <button className='bg-gradient-to-r from-blue-500 to-pink-600  hover:from-pink-500 hover:to-blue-500 hover:text-black text-sm lg:text-xl'>
      {child}
    </button>
  );
}
