import { useState } from "react";
import Box from "../../components/Box";
import { DangerButton, BlackButton } from "../../components/Button";

function WithDraw() {
  const [btc, setBtc] = useState("");
  const [eth, setETH] = useState("");
  const [usdt, setUSDT] = useState("");

  return (
    <div className="h-auto flex flex-col gap-5">
      <div className="black-gradient flex p-5 justify-end">
        <h1 className="h1">Add your Withdraw info</h1>
      </div>

      <Box>
        <h4> Withdrawal Account: </h4>
        <form>
          <div className="mt-5 mb-10 flex flex-col gap-5">
            <input
              type="text"
              className="bg-slate-300 p-3"
              value={btc}
              onChange={(e) => setBtc(e.target.value)}
              placeholder="Bitcoin"
            />
            <input
              type="text"
              className="bg-slate-300 p-3"
              value={eth}
              onChange={(e) => setETH(e.target.value)}
              placeholder="Ethereum"
            />
            <input
              type="text"
              className="bg-slate-300 p-2"
              value={usdt}
              onChange={(e) => setUSDT(e.target.value)}
              placeholder="USDT"
            />
          </div>
          <div className="flex justify-center gap-5">
            <BlackButton className="">Submit</BlackButton>
            <DangerButton className="">Cancel</DangerButton>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default WithDraw;
