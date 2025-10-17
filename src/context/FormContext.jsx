import React, { createContext, useState, useContext } from 'react';

// Create the context
const FormContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [capturedDocuments, setCapturedDocuments] = useState({});
  const [formData, setFormData] = useState({});

  const addCapturedDocument = (step, imageData, content) => {
    setCapturedDocuments(prev => ({
      ...prev,
      [step]: { imageData, content, timestamp: new Date().toISOString() }
    }));
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const value = {
    mobileNumber,
    setMobileNumber,
    isAgreed,
    setIsAgreed,
    capturedDocuments,
    addCapturedDocument,
    formData,
    updateFormData,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// Create a custom hook to use the context
export const useForm = () => {
  return useContext(FormContext);
};
