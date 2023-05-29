// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

//Components
import MyBtn from "../../components/MyBtn";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, EffectFade, Navigation } from "swiper";

// import images
import bg1 from "../../assets/images/bg.jpg";
import bg2 from "../../assets/images/bg2.jpg";
import bg3 from "../../assets/images/bg3.jpg";
import image1 from "../../assets/images/avatar.png";
import image2 from "../../assets/images/woman.png";
import image3 from "../../assets/images/img7.png";

const Header = () => {
  return (
    <div className="h-[70vh] lg:h-[90vh]">
      <Swiper
        spaceBetween={30}
        // slidesPerView={1}
        loop={true}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, EffectFade, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img className="h-full w-full object-cover" src={bg1} alt="" />
            <div className="absolute p-5 top-0 sm:mt-10 lg:left-20 grid grid-cols-2 gap-5 items-center justify-center text-white">
              <div className="p-5 text-left rounded-md shadow-sm">
                <h1 className="text-2xl font-bold mb-4 sm:text-4xl lg:text-6xl">
                  Invest With A Firm You Can{" "}
                  <span className="pink-text-gradient">Trust</span>
                </h1>
                <p className="text-sm lg:text-lg">
                  24/7 monitoring of your investment is Assured
                </p>
                <div className="mt-5">
                  <MyBtn child="Get Started" />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="ml-5"
                  src={image1}
                  alt=""
                  style={{ width: "60%", height: "" }}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img className="h-full w-full object-cover " src={bg2} alt="" />
            <div className="lg:w-[70%] sm:mt-10 lg:mx-auto lg:mt-10 lg:left-[20rem] absolute p-5 top-0  items-center justify-center text-white">
              <div className="black-gradient p-5 text-left rounded-md shadow-2xl">
                <h1 className="text-2xl font-bold mb-4 sm:text-4xl lg:text-6xl">
                  More <span className=" blue-text-gradient">convenient</span>{" "}
                  Than Others
                </h1>
                <p className="text-sm lg:text-lg">
                  <span className="text-xl font-bold pink-text-gradient">
                    Invest with us!{" "}
                  </span>
                  Let your money do the hardwork.
                </p>
                <div className="mt-5">
                  <MyBtn child="Get Started" />
                </div>
              </div>
              <div className="flex lg:mr-[200px] items-center justify-left">
                <img
                  className="sm:hidden"
                  src={image3}
                  alt=""
                  style={{ width: "50%", height: "" }}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img className="h-full w-full object-cover" src={bg3} alt="" />
            <div className="absolute p-5 top-10 sm:mt-10 lg:left-20 grid grid-cols-2 gap-5 items-center justify-center ">
              <div className="p-5 text-left rounded-md shadow-xl">
                <h1 className="text-3xl font-bold mb-4 sm:text-5xl lg:text-7xl text-black">
                  We Serve You{" "}
                  <span className="orange-text-gradient">Better</span>
                </h1>
                <p className="text-sm lg:text-lg text-black">
                  We hire the best traders to serve you better
                </p>
                <div className="mt-5">
                  <MyBtn child="Get Started" />
                </div>
              </div>
              <div className="flex items-center justify-center object-contain">
                <img
                  className=""
                  src={image2}
                  alt=""
                  style={{ width: "50%", height: "" }}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Header;
