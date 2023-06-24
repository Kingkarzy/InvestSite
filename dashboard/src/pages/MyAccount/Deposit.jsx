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
import emailjs from '@emailjs/browser';
import { Load } from '../../components/Load';
import Loading from '../../components/Loading';

const baseUrl = import.meta.env.VITE_BASE_URL;

const emailjs_apikey = import.meta.env.VITE_EMAILJS_API_KEY;
const emailjs_templatekey = import.meta.env.VITE_EMAILJS_TEMPLATE_KEY;
const emailjs_servicekey = import.meta.env.VITE_EMAILJS_SERVICE_KEY;
emailjs.init(emailjs_apikey);

function Deposit() {
  const user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState('');
  const [btc, setBtc] = useState('');
  const [eth, setETH] = useState('');
  const [usdt, setUSDT] = useState('');
  const [picturePath, setPicturePath] = useState('');
  const [result, setResult] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 10000000) {
      return alert('Deposit amount greater than $100,000');
    }
    if (amount < 10) {
      return alert('Deposit amount less than $500');
    }
    setIsLoading(true);
    // Create a FormData object to handle the file upload
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('amount', amount);
    formData.append('mode', mode);
    formData.append('status', 'pending');
    formData.append('date', new Date());
    formData.append('picture', picturePath);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/deposit`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      },
      data: formData,
    };

    const emailParams = {
      to_name: user.username,
      to_email: user.email,
      message: `Your deposit of $${amount} has been successfully lodged and is being processed.`,
      subject: 'Deposit Confirmation',
      from_email: 'no-reply@goobull.com',
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        emailjs
          .send(
            emailjs_servicekey,
            emailjs_templatekey,
            emailParams,
            emailjs_apikey
          )
          .then((response) => {
            console.log('Confirmation email sent:', response.text);
          })
          .catch((error) => {
            console.log('Error sending confirmation email:', error);
          });
        setIsLoading(false);
        alert('Deposit Successful!');
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsTableLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/api/deposit/${user._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setResult(response.data);
        setIsTableLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user._id, user.token]);

  if (isLoading) {
    return (
      <Loading
        handleClose={handleClose}
        open={open}
      />
    );
  }
  return (
    <div className=''>
      <div className='black-gradient flex p-5 justify-center'>
        <h1 className='text-3xl blue-text-gradient'>Deposit</h1>
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
                        {
                          type: file.type,
                        }
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
        {isTableLoading ? (
          <Load />
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default Deposit;
