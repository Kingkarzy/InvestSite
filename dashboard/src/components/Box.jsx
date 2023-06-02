/* eslint-disable react/prop-types */

function Box({ children }) {
  return (
    <div className="w-auto h-auto mx-auto bg-white p-5 flex flex-col rounded-sm shadow-2xl">
      {children}
    </div>
  );
}

function UseBox({ icon, name, amount }) {
  return (
    <div className="w-[200px] h-[150px] flex flex-col py-5 bg-white gap-4 rounded-sm items-center justify-between">
      <div className="">{icon}</div>
      <div className="font-bold">{name}</div>
      <div className="font-semibold">{amount}</div>
    </div>
  );
}

export { Box, UseBox };
