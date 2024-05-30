import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ToastContext = createContext();

export const useToastContext = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const showSuccess = (message) => {
    toast.success(message);
  };
  const showError = (message) => {
    toast.error(message);
  };
  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
