import ScrollAnimation from "react-animate-on-scroll";
const Why = () => {
  return (
    <div className="bg-bg lg:p-12 p-5 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-white font-extralight text-5xl mb-10">
          Why Choose to Invest with us?
        </h1>
        <div className="flex items-center w-full flex-col mx-auto justify-center">
          <ScrollAnimation
            animateIn="animate__fadeInUp"
            delay="200"
            duration={200}
            className=" w-2/3 "
          >
            <div className="flex flex-row mb-14 w-3/3 lg:w-2/3 border-solid border-2 rounded-md border-purple-500 p-4">
              <h1 className="background-gradient py-1.5 px-3 h-9 rounded-full font-semibold text-lg mr-6 text-white">
                1. &nbsp;
              </h1>
              <div>
                <h2 className="mb-2 font-semibold text-lg text-white">
                  Unique design
                </h2>
                <p className="text-sm text-white">
                  Investment Trading has a user-friendly and intelligible
                  interface so that you can make the most of our investment
                  platform without any hassle.
                </p>
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="animate__fadeInUp"
            delay="200"
            duration={200}
            className=" w-2/3 "
          >
            <div className="flex flex-row mb-14 w-3/3 lg:w-2/3 border-solid border-2 rounded-md border-green-400 p-2">
              <h1 className="background-gradient py-1 px-2 lg:py-1.5 lg:px-3 h-9 rounded-full font-semibold text-lg mr-6 text-white">
                2. &nbsp;
              </h1>
              <div>
                <h2 className="mb-2 font-semibold text-lg text-white">
                  Professional team
                </h2>
                <p className="text-sm  text-white">
                  Our team has extensive experience in the field of
                  cryptocurrency & forex trading and use flexible strategies to
                  generate maximum profits.
                </p>
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="animate__fadeInUp"
            delay="200"
            duration={200}
            className=" w-2/3 "
          >
            <div className="flex flex-row mb-14 w-3/3 lg:w-2/3  border-solid border-2 rounded-md border-orange-400 p-4">
              <h1 className="background-mixed-gradient py-1.5 px-3 h-10 rounded-full font-semibold text-lg mr-6 text-white">
                3. &nbsp;
              </h1>
              <div>
                <h2 className="mb-2 font-semibold text-lg text-white">
                  Secure platform
                </h2>
                <p className="text-sm text-white">
                  Our site is within a dedicated & DDOS protected server.
                </p>
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="animate__fadeInUp"
            delay="200"
            duration={200}
            className=" w-2/3 "
          >
            <div className="flex flex-row mb-14 w-3/3 lg:w-2/3  border-solid border-2 rounded-md border-sky-400 p-4">
              <h1 className="background-indigo-gradient py-1.5 pl-3 pr-1.5 h-10 rounded-full font-semibold text-lg mr-6 text-white">
                4. &nbsp;
              </h1>
              <div>
                <h2 className="mb-2 font-semibold text-lg text-white">
                  24/7 Live Support
                </h2>
                <p className="text-sm lg:text-base text-white">
                  We provide 24x7 client support.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default Why;
