import { AddRounded } from '@mui/icons-material';
import {
  PrimaryButton,
  DangerButton,
  BlackButton,
} from '../../components/Button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import Box from '../../components/Box';

function Deposit() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useSelector((state) => state.user);

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState('');
  const [btc, setBtc] = useState('');
  const [eth, setETH] = useState('');
  const [usdt, setUSDT] = useState('');

  const [picturePath, setPicturePath] = useState('');

  const [result, setResult] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 100000) {
      return alert('Deposit amount greater than $100,000');
    }
    if (amount < 500) {
      return alert('Deposit amount less than $500');
    }

    // Create a FormData object to handle the file upload
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('amount', amount);
    formData.append('mode', mode);
    formData.append('status', 'pending');
    formData.append('date', getCurrentDate());
    formData.append('picture', picturePath);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/api/deposit',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert('Deposit Successful!');
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/deposit/${user._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setResult(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=''>
      <div className='black-gradient flex p-5 justify-end'>
        <h1 className='h1 '>Deposit</h1>
      </div>
      <div
        className='w-fit my-6'
        onClick={handleOpen}
      >
        <PrimaryButton className=''>
          <AddRounded /> New Deposit
        </PrimaryButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className='h-auto flex flex-col gap-5'>
          <div className='black-gradient flex p-4 justify-center'>
            <h1 className='h1'>Make a Deposit</h1>
          </div>

          <Box>
            <div className='w-full my-3'>
              <h4> Deposit Amount: </h4>
              <input
                type='number'
                className='w-3/4 bg-slate-100 border border-black p-3 my-2'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Amount'
              />
            </div>
            <h4 className='font-medium'> Deposit Account: </h4>
            <form>
              <div className='mt-5 mb-10 flex flex-col gap-5'>
                <select
                  onChange={(e) => {
                    setMode(e.target.value);
                  }}
                >
                  <option
                    value='default'
                    disabled
                    selected
                    required
                  >
                    Select a Currency
                  </option>
                  <option value='BTC'>BTC</option>
                  <option value='ETH'>ETH</option>
                  <option value='USDT'>USDT</option>
                </select>
                {mode === 'BTC' && (
                  <input
                    type='text'
                    className='bg-slate-100 p-3'
                    value={btc}
                    disabled
                    onChange={(e) => setBtc(e.target.value)}
                    placeholder='Bitcoin Wallet: o34iurhk3ri3ru4uih4r8qfihfb87hifwn3849'
                  />
                )}
                {mode === 'ETH' && (
                  <input
                    type='text'
                    className='bg-slate-100 p-3'
                    value={eth}
                    disabled
                    onChange={(e) => setETH(e.target.value)}
                    placeholder='Ethereum Wallet: hr8934ho8r7fuihk3vbfyrf7834yfh3keirh'
                  />
                )}
                {mode === 'USDT' && (
                  <input
                    type='text'
                    className='bg-slate-100 p-2'
                    value={usdt}
                    disabled
                    onChange={(e) => setUSDT(e.target.value)}
                    placeholder='USDT Wallet: ie38994ptyhqp349orr0349urhliufb3k4ugfyu'
                  />
                )}
                <label htmlFor=''>
                  Upload Proof (.jpg, .jpeg, .png, .pdf only)
                </label>
                {(mode === 'USDT' || 'BTC' || 'ETH') && (
                  <input
                    type='file'
                    className='bg-slate-100 p-3'
                    required
                    accept='.jpg, .jpeg, .png, .pdf'
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const fileName = file.name.replace(
                        /\s/g,
                        '%20'
                      );
                      const modifiedFile = new File(
                        [file],
                        fileName,
                        { type: file.type }
                      );
                      setPicturePath(modifiedFile);
                    }}
                  />
                )}
              </div>
              <div className='flex justify-center gap-5'>
                <BlackButton>
                  <button
                    className=''
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </BlackButton>
                <button onClick={handleClose}>
                  <DangerButton className=''>Cancel</DangerButton>
                </button>
              </div>
            </form>
          </Box>
        </div>
      </Modal>
      <div>
        <table className='table w-full mb-5 border border-solid border-gray-100'>
          <thead className='bg-white'>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Payment mode</th>
              <th>Status</th>
              <th>Date created</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, index) => (
              <tr key={item._id}>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{item.amount}</td>
                <td className='text-center'>{item.mode}</td>
                <td className='text-center'>{item.status}</td>
                <td className='text-center'>
                  {new Date(item.date).toLocaleDateString('en-GB')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Deposit;
