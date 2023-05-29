
function TeamCard({image, name, title}) {
  return (
    <div className="flex flex-col w-[250px] h-[200px] box-border bg-white shadow-xl p-5 text-black">
      <div className="text-center flex justify-center flex-row gap-4">
        <img src={image} alt="" className=" w-[90px] h-[12vh] rounded-full " />
        <div>
          <h2 className="text-xl mt-3 font-semibold">{name}</h2>
        </div>
      </div>
      <div className="mt-5">{title}</div>
    </div>
  );
}

export default TeamCard;
