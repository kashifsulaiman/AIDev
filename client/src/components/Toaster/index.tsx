import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toastify = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss
      theme="light"
    />
  );
};

export const showToaster = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'info'
) => {
  toast[type](message);
};
