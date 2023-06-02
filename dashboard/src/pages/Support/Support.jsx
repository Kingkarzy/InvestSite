import { Box } from "../../components/Box";

function Support() {
  return (
    <div className="h-screen flex flex-col gap-5">
      <div className="black-gradient flex p-4 justify-end">
        <h1 className="h2">Apex AI Trading Support</h1>
      </div>
      <div className="flex justify-start">
        <Box>
          <div className="">
            <p>For inquiries, suggestions, and complaints, Mail us at</p>
            <br />
            <p className="font-semibold">support@apexaitrading.com</p>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default Support;
