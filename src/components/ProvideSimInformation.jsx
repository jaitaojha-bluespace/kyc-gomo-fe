import React, { useState, useRef, useEffect } from 'react';
import { useForm } from '../context/FormContext';
import { IoChevronDown } from 'react-icons/io5';
import Button from './ui/Button';
import { getRegTypeList } from '../services/RegTypeListApi';
import ErrorModal from './ui/ErrorModal';
import { submitRegType } from '../services/RegTypeApi';

const ProvideSimInformation = ({ onNext }) => {
  const { mobileNumber } = useForm();
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [userTypes, setUserTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    message: ''
  });
  const [sessionId, setSessionId] = useState(null);
  const dropdownRef = useRef(null);

  // Get sessionId from localStorage and fetch registration types
  useEffect(() => {
    const fetchRegTypes = async () => {
      const storedSessionId = localStorage.getItem('sessionId');
      if (storedSessionId) {
        setSessionId(storedSessionId);
      }

      try {
        setIsLoading(true);
        const regTypeData = await getRegTypeList({ sessionId: storedSessionId });
        
        // Transform API data to match expected format
        if (regTypeData?.regTypes?.length > 0) {
          const transformedData = regTypeData.regTypes.map((item, index) => ({
            id: item.key || item.value || `option_${index}`,
            label: item.key || item.value || `Option ${index + 1}`
          }));
          setUserTypes(transformedData);
        }
      } catch (err) {
        const msg = err?.body?.errors?.[0]?.displayMessage || err?.message || 'Failed to load registration types. Please try again.';
        setErrorModal({ isOpen: true, message: msg });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegTypes();
  }, []);

  const handleNext = async (e) => {
    e.preventDefault();
    if (!selectedOption || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const selected = userTypes.find(option => option.id === selectedOption);
      const regTypePayload = {
        key: selected?.id || selectedOption,
        value: selected?.label || selectedOption
      };
      await submitRegType({ ...regTypePayload }, { sessionId, locale: 'en' });
      onNext();
    } catch (err) {
      const msg = err?.body?.errors?.[0]?.displayMessage || err?.message || 'Failed to submit registration type. Please try again.';
      setErrorModal({ isOpen: true, message: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setIsOpen(false);
  };

  const getSelectedLabel = () => {
    const selected = userTypes.find(option => option.id === selectedOption);
    return selected ? selected.label : 'Select';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-6">
        {/* Instruction */}
        <div className="text-left">
          <p 
            className="text-gray-400 text-sm sm:text-base"
            style={{
              fontFamily: 'Proxima Nova',
              fontWeight: 400
            }}
          >
            Which description best fits you?
          </p>
        </div>

        {/* Dropdown */}
        <div className="relative mb-8" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => !isLoading && setIsOpen(!isOpen)}
            disabled={isLoading}
            className="w-full p-4 rounded-lg text-left cursor-pointer transition-colors duration-200 border-2 border-transparent hover:bg-gray-700 hover:bg-opacity-20 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              backgroundColor: '#402E5C',
              border: '2px solid #9569DB'
            }}
          >
            <div className="flex items-center justify-between">
              <p
                className="text-sm sm:text-base leading-relaxed text-white"
                style={{
                  fontFamily: 'Proxima Nova',
                  fontWeight: 400
                }}
              >
                {isLoading ? 'Loading options...' : getSelectedLabel()}
              </p>
              {!isLoading && (
                <IoChevronDown 
                  size={20} 
                  className={`transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  style={{ color: '#D20E56' }}
                />
              )}
            </div>
          </button>

          {/* Dropdown Options */}
          {isOpen && !isLoading && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-lg overflow-hidden shadow-lg z-10">
              <div 
                className="max-h-80 overflow-y-auto"
                style={{ backgroundColor: '#402E5C' }}
              >
                {userTypes.length > 0 ? (
                  userTypes.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className={`p-4 cursor-pointer transition-colors duration-200 border-b last:border-b-0 ${
                        selectedOption === option.id
                          ? ''
                          : 'hover:bg-gray-700 hover:bg-opacity-20'
                      }`}
                      style={{
                        borderBottomColor: '#9569DB'
                      }}
                    >
                      <p
                        className={`text-sm sm:text-base leading-relaxed ${
                          selectedOption === option.id
                            ? 'text-[#D20E56] font-semibold'
                            : 'text-white'
                        }`}
                        style={{
                          fontFamily: 'Proxima Nova',
                          fontWeight: selectedOption === option.id ? 600 : 400
                        }}
                      >
                        {option.label}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center">
                    <p
                      className="text-white text-sm"
                      style={{
                        fontFamily: 'Proxima Nova',
                        fontWeight: 400
                      }}
                    >
                      No options available
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-8">
        <Button
          type="button"
          onClick={handleNext}
          disabled={!selectedOption || isLoading || isSubmitting}
        >
          {isLoading ? 'Loading...' : (isSubmitting ? 'Submitting...' : 'Next')}
        </Button>
      </div>

      {/* Error Modal */}
      <ErrorModal
        isOpen={errorModal.isOpen}
        message={errorModal.message}
        onClose={() => setErrorModal({ isOpen: false, message: '' })}
      />
    </div>
  );
};

export default ProvideSimInformation;
