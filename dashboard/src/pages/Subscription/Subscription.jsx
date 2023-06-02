import {PrimaryButton, OutlineButton} from "../../components/Button"
function Subscription() {
  return (
    <div className="flex flex-col gap-5">
      <div className="black-gradient flex p-4 justify-center">
        <h1 className="h2">Subscription Trade</h1>
      </div>
      <div className="">
        <div>
          <h2 className="font-semibold">
            Apex Trading Services Account Manager
          </h2>
          <br />
          <p className="lg:w-2/3 font-light">
            Don't have time to trade or learn how to trade? Our Account
            Management Service is The Best Profitable Trading Option for you. We
            can help you to manage your account in the financial Market with a
            simple Subscriptionmodel.
          </p>
          <br />
          <h6 className="font-semibold">Term and Conditions apply</h6>
          <p className="font-light">
            Reach us @support@apexaitrading.com for more info.
          </p>

          <div className=" flex gap-5 my-5 m-auto">
            <PrimaryButton><span className="text-white hover:text-black">Subscribe Now</span></PrimaryButton>
            <OutlineButton>Submit MT4 Details</OutlineButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
