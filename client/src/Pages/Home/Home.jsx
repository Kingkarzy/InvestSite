import Divider from "../../components/Divider";
import Features from "./Features";
import Header from "./Header";
import Testimonials from "./Testimonials";
import Chart from "./Chart";
import Plans from "./Plans";
import Why from "./Why";
import MobileApps from "./MobileApps";
import btc from "../../assets/images/btc.svg";
import doge from "../../assets/images/doge.svg";
import usdt from "../../assets/images/usdt.svg";
import eth from "../../assets/images/eth.svg";
import fx from "../../assets/images/fx.svg";

const Home = () => {
  return (
    <div className="flex flex-col scroll-smooth">
      <Header />
      <Divider />
      <Features />
      <Divider />
      <Why />
      <Divider />
      <Plans />
      <Divider />
      <Chart />
      <Divider />
      <Testimonials />
      <div className="mb-10 flex justify-center gap-4 md:gap-12 lg:gap-52 overflow-hidden">
        <img
          src={usdt}
          height="40px"
          width="40px"
          className="img-hover-opacity"
        />
        <img
          src={doge}
          height="40px"
          width="40px"
          className="img-hover-opacity"
        />
        <img
          src={btc}
          height="40px"
          width="40px"
          className="img-hover-opacity"
        />
        <img
          src={eth}
          height="40px"
          width="40px"
          className="img-hover-opacity"
        />
        <img
          src={fx}
          height="40px"
          width="40px"
          className="img-hover-opacity"
        />
      </div>
      <MobileApps/>
    </div>
  );
};

export default Home;
