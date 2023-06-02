import {Box} from "../../components/Box"
function Refer() {
  return (
    <div className="h-screen flex flex-col gap-5">
      <div className="black-gradient flex p-4 justify-end">
        <h1 className="h2">Refer Users to Apex Trading Services Community</h1>
      </div>
      <div>
        <Box>
          <h2 className="font:semibold">You can refer users by sharing your referral link:</h2>
          <div>[http://apexaitrading.com/ref/{1644}]</div>
        </Box>
      </div>
      <div>
        <Box>
          <h2>[Your Sponsor]</h2>
          <div>[Avatar]</div>
          <div>[null]</div>
        </Box>
      </div>
      <div>
        <table className="table w-full my-5 border text-center border-solid border-gray-100">
          <thead className="bg-white">
            <tr>
              <th>Client Name</th>
              <th>Client Inv. Plan</th>
              <th>Client Status</th>
              <th>Ref Level</th>
              <th>Date Registered</th>
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

export default Refer;
