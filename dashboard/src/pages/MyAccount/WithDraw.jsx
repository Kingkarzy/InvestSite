/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import Box from '../../components/Box';
import {
  DangerButton,
  BlackButton,
  PrimaryButton,
} from '../../components/Button';
import axios from 'axios';
import { LoadingContext } from '../../state/LoadingContext';
import { useSelector } from 'react-redux';
import { AddRounded } from '@mui/icons-material';
import { Modal } from '@mui/material';
import { CSVLink } from 'react-csv';
import emailjs from '@emailjs/browser';
import Load from '../../components/Load';

const baseUrl = import.meta.env.VITE_BASE_URL;

const emailjs_apikey = import.meta.env.VITE_EMAILJS_API_KEY;
const emailjs_templatekey = import.meta.env.VITE_EMAILJS_TEMPLATE_KEY;
const emailjs_servicekey = import.meta.env.VITE_EMAILJS_SERVICE_KEY;
emailjs.init(emailjs_apikey);

function WithDraw() {
  const user = useSelector((state) => state.user);
  const [amount, setAmount] = useState(0);
  const [mode, setMode] = useState('BTC');
  const [wallet, setWallet] = useState('');
  const [result, setResult] = useState([]);
  const [balance, setBalance] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  // MUI MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchWithdrawData = async () => {
      try {
        setIsTableLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/withdraw/${user._id}`,
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

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/admin/users/${user._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWithdrawData();
    fetchUserData();
  }, [user._id, user.token]);

  // HANDLE SUBMIT FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount > balance) {
      return alert('Withdrawal amount greater than balance');
    }
    if (amount < 100) {
      return alert('Withdrawal amount less than $100');
    }
    setIsLoading(true);
    const data = JSON.stringify({
      userId: user._id,
      amount: amount,
      mode: mode,
      wallet: wallet,
      status: 'pending',
      date: new Date(),
    });

    const emailParams = {
      to_name: user.username,
      to_email: user.email,
      message: `Your withdrawal of $${amount} has been successfully lodged and is being processed.`,
      subject: 'Withdrawal Confirmation',
    };
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/withdraw`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      data: data,
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
        alert('Withdraw Successful!');
        handleClose();
        setAmount(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoading) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div className='items-center justify-center flex h-screen font-semibold text-3xl'>
          Loading<span className='dot-1'>.</span>
          <span className='dot-2'>.</span>
          <span className='dot-3'>.</span>
        </div>
      </Modal>
    );
  }

  return (
    <div className='overflow-y-scroll h-[70vh]'>
      <div className='my-3'>
        <div className='background-gradient flex p-4 justify-end'>
          <h1 className='h1'>See Our Withdrawal Methods</h1>
        </div>
        <div className='flex flex-row gap-5 flex-wrap lg:flex-nowrap my-5'>
          <Box>
            <div className='bg-gray-200 p-3 my-2'>Bitcoin</div>
            <div className=' flex  flex-col gap-2'>
              <div className='flex justify-between'>
                <div>Minimum amount:</div>
                <div>
                  <b>$100</b>
                </div>
              </div>
              <div className='flex justify-between'>
                <div>Maximum amount:</div>
                <b>$100000</b>
              </div>
              <div className='flex justify-between'>
                <div>Charges (Fixed):</div>
                <b>$0</b>
              </div>
              <div className='flex justify-between'>
                <div>Charges (%):</div>
                <b>$0</b>
              </div>
              <div className='flex justify-between'>
                <div>Duration:</div>
                <b>immediately</b>
              </div>
            </div>
          </Box>
          <Box>
            <div className='bg-gray-200 p-3 my-2'>USDT</div>
            <div className=' flex  flex-col gap-2'>
              <div className='flex justify-between'>
                <div>Minimum amount:</div>
                <b>$100</b>
              </div>
              <div className='flex justify-between'>
                <div>Maximum amount:</div>
                <b>$100000</b>
              </div>
              <div className='flex justify-between'>
                <div>Charges (Fixed):</div>
                <b>$0</b>
              </div>
              <div className='flex justify-between'>
                <div>Charges (%):</div>
                <b>$0</b>
              </div>
              <div className='flex justify-between'>
                <div>Duration:</div>
                <b>immediately</b>
              </div>
            </div>
          </Box>
        </div>
      </div>

      <div
        className='w-fit my-6 text-white'
        onClick={handleOpen}
      >
        <PrimaryButton className=''>
          <AddRounded /> Request Withdrawal
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
            <h1 className='h1'>Add your Withdraw Info</h1>
          </div>

          <Box>
            <div className='w-full my-3'>
              <h4> Withdrawal Amount: </h4>
              <input
                type='number'
                className='w-3/4 bg-slate-100 border border-black p-3 my-2'
                value={amount}
                min={100}
                max={balance}
                step={1}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Amount'
              />
            </div>
            <h4> Withdrawal Account: </h4>
            <form>
              <div className='mt-5 mb-10 flex flex-col gap-5'>
                <select
                  onChange={(e) => {
                    setMode(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  <option
                    value='default'
                    selected
                    disabled
                  >
                    Select a Currency
                  </option>
                  <option value='BTC'>BTC Wallet</option>
                  <option value='ETH'>ETH Wallet</option>
                  <option value='USDT'>USDT Wallet</option>
                </select>
                {mode === 'BTC' && (
                  <input
                    type='text'
                    className='bg-slate-100 p-3'
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder='Wallet Address'
                    required
                  />
                )}
                {mode === 'ETH' && (
                  <input
                    type='text'
                    className='bg-slate-100 p-3'
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder='Ethereum'
                    required
                  />
                )}
                {mode === 'USDT' && (
                  <input
                    type='text'
                    className='bg-slate-100 p-2'
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder='USDT'
                    required
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
      <div className='py-5'>
        <div className='black-gradient flex p-4 justify-start'>
          <h1 className='h2'>Withdraw History</h1>
        </div>
        <div className='w-full flex justify-end'>
          <div className='w-fit my-5'>
            <CSVLink
              data={result}
              className='text-white'
            >
              <PrimaryButton>Download as .xls/.xlsx </PrimaryButton>
            </CSVLink>
          </div>
        </div>
        {isTableLoading ? (
          <Load />
        ) : (
          <table className='table w-full my-5 border text-center border-solid border-gray-100'>
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
                  <td>{index + 1}</td>
                  <td>{item.amount}</td>
                  <td>{item.mode}</td>
                  <td>{item.status}</td>
                  <td>
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

export default WithDraw;
