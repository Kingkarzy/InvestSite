import { useState } from "react";
import {Box} from "../../components/Box";
import { DangerButton, BlackButton } from "../../components/Button";


function WithDraw() {
  const [amount, setAmount] = useState("");
  const [btc, setBtc] = useState("");
  const [eth, setETH] = useState("");
  const [usdt, setUSDT] = useState("");

  const payNow = () => {
    alert("Withdraw Successful!");
  };

  return (
    <div className="">
      <div className="my-3">
        <div className="black-gradient flex p-4 justify-end">
          <h1 className="h1">See Our Withdrawal Methods</h1>
        </div>
        <div className="flex flex-row gap-5 flex-wrap lg:flex-nowrap my-5">
          <Box>
            <div className="bg-gray-200 p-3 my-2">Bitcoin</div>
            <div className=" flex  flex-col gap-2">
              <div className="flex justify-between">
                <div>Minimum amount:</div>
                <div>
                  <b>$20</b>
                </div>
              </div>
              <div className="flex justify-between">
                <div>Maximum amount:</div>
                <b>$100000</b>
              </div>
              <div className="flex justify-between">
                <div>Charges (Fixed):</div>
                <b>$0</b>
              </div>
              <div className="flex justify-between">
                <div>Charges (%):</div>
                <b>$0</b>
              </div>
              <div className="flex justify-between">
                <div>Duration:</div>
                <b>immediately</b>
              </div>
            </div>
          </Box>
          <Box>
            <div className="bg-gray-200 p-3 my-2">USDT</div>
            <div className=" flex  flex-col gap-2">
              <div className="flex justify-between">
                <div>Minimum amount:</div>
                <b>$20</b>
              </div>
              <div className="flex justify-between">
                <div>Maximum amount:</div>
                <b>$100000</b>
              </div>
              <div className="flex justify-between">
                <div>Charges (Fixed):</div>
                <b>$0</b>
              </div>
              <div className="flex justify-between">
                <div>Charges (%):</div>
                <b>$0</b>
              </div>
              <div className="flex justify-between">
                <div>Duration:</div>
                <b>immediately</b>
              </div>
            </div>
          </Box>
        </div>
      </div>

      <div className="h-auto flex flex-col gap-5">
        <div className="black-gradient flex p-4 justify-center">
          <h1 className="h1">Add your Withdraw Info</h1>
        </div>

        <Box>
          <div className="w-full my-3">
            <h4> Withdrawal Account: </h4>
            <input
              type="number"
              className="w-3/4 bg-slate-100 border border-black p-3 my-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
          </div>
          <h4> Withdrawal Account: </h4>
          <form>
            <div className="mt-5 mb-10 flex flex-col gap-5">
              <input
                type="text"
                className="bg-slate-100 p-3"
                value={btc}
                onChange={(e) => setBtc(e.target.value)}
                placeholder="Bitcoin"
              />
              <input
                type="text"
                className="bg-slate-100 p-3"
                value={eth}
                onChange={(e) => setETH(e.target.value)}
                placeholder="Ethereum"
              />
              <input
                type="text"
                className="bg-slate-100 p-2"
                value={usdt}
                onChange={(e) => setUSDT(e.target.value)}
                placeholder="USDT"
              />
            </div>
            <div className="flex justify-center gap-5">
              <BlackButton>
                <button className="" onClick={payNow}>
                  Submit
                </button>
              </BlackButton>
              <DangerButton className="">Cancel</DangerButton>
            </div>
          </form>
        </Box>
      </div>
      <div className="py-5">
        <div className="black-gradient flex p-4 justify-start">
          <h1 className="h2">Withdraw History</h1>
        </div>

        <table className="table w-full my-5 border text-center border-solid border-gray-100">
          <thead className="bg-white">
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Payment mode</th>
              <th>Status</th>
              <th>Date created</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{1}</td>
              <td>{200}</td>
              <td>{"BTC"}</td>
              <td>{"Paid"}</td>
              <td>{"20-10-2023"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WithDraw;
