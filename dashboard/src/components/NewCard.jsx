/* eslint-disable react/prop-types */
const NewCard = ({ logo, heading, value, checkout }) => {
  return (
    <div className="w-2/4 flex flex-col justify-center items-center gap-3 bg-white rounded-lg shadow-2xl m-3 p-3">
      <div>{logo}</div>
      <h1 className="uppercase blue-text-gradient font-semibold shadow-sm">{heading}</h1>
      <div className="my-3 text-3xl font-bold">{value}</div>
      <div className="my-2 text-sm font-lighter  text-slate-500 opacity-50">{checkout}</div>
    </div>
  );
};
export default NewCard;
