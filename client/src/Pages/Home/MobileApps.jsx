import image from "../../assets/images/download.png"
function MobileApps() {
  return (
    <div className="p-10 lg:w-[80%] mx-auto bg-white items-center justify-center">
      <h1 className="mb-10 text-4xl text-center font-semibold text-black">
        MOBILE APPS COMING SOON 
      </h1>
      <img src={image} alt="" className="content-center justify-center align-middle mx-auto " width={400}  height={200}/>
    </div>
  );
}

export default MobileApps;
