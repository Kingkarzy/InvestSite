// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useTypewriter } from "react-simple-typewriter";
import MyImage from "../../components/LazyLoad";
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
import bg1 from "../../assets/images/bg.webp";
import bg2 from "../../assets/images/bg2.webp";
import bg3 from "../../assets/images/bg3.webp";
import image1 from "../../assets/images/avatar.webp";
import { Link } from "react-router-dom";
// import image2 from "../../assets/images/woman.png";
// import image3 from "../../assets/images/bank.png";
const Header = () => {
  const [text] = useTypewriter({
    words: ["Trust", "Bank on"],
    typeSpeed: 120,
    deleteSpeed: 50,
    delaySpeed: 500,
    loop: 0,
  });
  const [text2] = useTypewriter({
    words: ["convenient", "suitable"],
    typeSpeed: 200,
    deleteSpeed: 50,
    delaySpeed: 500,
    loop: 0,
  });
  const [text3] = useTypewriter({
    words: ["Better", "Greater", "faster"],
    typeSpeed: 100,
    deleteSpeed: 50,
    delaySpeed: 500,
    loop: 0,
  });

  return (
    <div className="h-[70vh] lg:h-[90vh] xs:mt-5 lg:mt-0">
      <Swiper
        spaceBetween={30}
        // slidesPerView={1}
        loop={true}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
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
          <div className="relative h-full w-full bg-pink-400">
            <img
              className="h-full w-full object-cover"
              src={bg1}
              alt="Background Image"
            />
            <div className="absolute p-5 top-0 mt-10 lg:mt-0 lg:left-20 grid grid-cols-2 gap-5 items-center justify-center text-white">
              <div className="p-5 text-left rounded-md shadow-sm">
                <h1 className="text-2xl font-bold mb-4 sm:text-4xl lg:text-6xl">
                  Invest With A Firm You Can <br />
                  <span className="pink-text-gradient">{text}</span>
                </h1>
                <p className="text-sm lg:text-lg">
                  24/7 monitoring of your investment is Assured
                </p>
                <div className="mt-5">
                  <Link to="/login">
                    <MyBtn child="Get Started" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center lg:mt-6">
                <MyImage
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
            <img
              className="h-full w-full object-cover "
              src={bg2}
              alt="Background Image"
            />
            <div className="lg:w-[70%] mt-10 lg:mx-auto lg:mt-10 lg:left-[20rem] absolute p-5 top-0  items-center justify-center text-white">
              <div className="black-gradient p-5 text-left rounded-md shadow-2xl">
                <h1 className="text-2xl font-bold mb-4 sm:text-4xl lg:text-6xl">
                  More <span className=" blue-text-gradient">{text2}</span> Than
                  Others
                </h1>
                <p className="text-sm lg:text-lg">
                  <span className="text-xl font-bold pink-text-gradient">
                    Invest with us!{" "}
                  </span>
                  Let your money do the hardwork.
                </p>
                <div className="mt-5">
                  <Link to="/login">
                    <MyBtn child="Get Started" />
                  </Link>
                </div>
              </div>
              <div className="flex lg:mr-[200px] items-center justify-left">
                {/* <img
                  className="sm:hidden"
                  src={image3}
                  alt=""
                  style={{ width: "35%", height: "" }}
                /> */}
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              className="h-full w-full object-cover"
              src={bg3}
              alt="Background Image"
            />
            <div className="absolute p-5 top-10 sm:mt-10 lg:left-20 grid grid-cols-2 gap-3 items-center justify-center ">
              <div className="p-5 text-left rounded-md shadow-sm">
                <h1 className="text-3xl font-bold mb-4 sm:text-5xl lg:text-7xl text-black">
                  We Serve You <br />
                  <span className="orange-text-gradient">{text3}</span>
                </h1>
                <p className="text-sm lg:text-lg text-black">
                  We hire the best traders to serve you better
                </p>
                <div className="mt-5">
                  <Link to="/login">
                    <MyBtn child="Get Started" />
                  </Link>
                </div>
              </div>
              <div className="flex w-1/3 items-center justify-center object-contain">
                {/* <img
                  className=""
                  src={image2}
                  alt=""
                  style={{ width: "50%", height: "" }}
                /> */}
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Header;
