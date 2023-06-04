/* eslint-disable react/prop-types */

export const Button = ({ children }) => {
  return (
    <div className='rounded-sm shadow-lg px-6 py-1 cursor-pointer hover:scale-90'>
      {children}
    </div>
  );
};

export const SecondaryButton = ({ children }) => {
  return (
    <div className='rounded-sm black-gradient shadow-lg px-6 py-1 cursor-pointer hover:scale-90'>
      {children}
    </div>
  );
};

export const BlackButton = ({ children }) => {
  return (
    <div className=' text-white bg-black rounded-sm shadow-lg px-6 py-1 cursor-pointer hover:scale-90'>
      {children}
    </div>
  );
};

export const DangerButton = ({ children }) => {
  return (
    <div className='rounded-sm bg-red-700 shadow-lg px-6 py-1 text-white cursor-pointer hover:scale-90 hover:text-red-700 hover:bg-white border hover:border-red-700'>
      {children}
    </div>
  );
};

export const WarningButton = ({ children }) => {
  return (
    <div className='rounded-sm bg-yellow-600 shadow-lg px-6 py-1 cursor-pointer hover:scale-90'>
      {children}
    </div>
  );
};

export const SuccessButton = ({ children }) => {
  return (
    <div className='rounded-sm bg-green-600 shadow-lg px-6 py-1 cursor-pointer hover:scale-90'>
      {children}
    </div>
  );
};

export const OutlineButton = ({ children }) => {
  return (
    <div className='rounded-sm bg-white border border-black shadow-lg px-6 py-2 items-center flex cursor-pointer hover:scale-90 hover:bg-black hover:text-white'>
      {children}
    </div>
  );
};

export const PrimaryButton = ({ children }) => {
  return (
    <div className='rounded-sm bg-blue-600 shadow-lg px-6 py-2 cursor-pointer hover:scale-95 hover:text-[#eee]'>
      {children}
    </div>
  );
};
