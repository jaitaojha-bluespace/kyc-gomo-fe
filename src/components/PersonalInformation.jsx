import React, { useState, useRef, useEffect } from 'react';
import { getEkycSummary } from '../services/EkycSummaryApi.js';
import { getProvinces, getCities, getBarangays, getPostalCode } from '../services/AddressApi.js';
import { submitUserDetails } from '../services/UserDetailsSubmitApi.js';
import dayjs from 'dayjs';

// --- Replaced Button Component ---
// This is a simple button component to replace the missing import.
// It accepts children and any other props a standard button would.
const Button = ({ children, disabled, ...props }) => {
  const defaultStyle = {
    width: '100%',
    maxWidth: '335px',
    height: '45px',
    borderRadius: '40px',
    paddingTop: '12px',
    paddingRight: '24px',
    paddingBottom: '12px',
    paddingLeft: '24px',
    background: 'linear-gradient(96.14deg, #D20E56 31.04%, #9569DB 100.11%)',
    boxShadow: '0px 0px 5.53px 1.38px #D20E5680',
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: '13px',
    lineHeight: '100%',
    letterSpacing: '0px',
    textAlign: 'center',
    verticalAlign: 'middle',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform 0.2s ease',
    color: 'white',
    opacity: disabled ? 0.5 : 1
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      e.target.style.transform = 'scale(1.05)';
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled) {
      e.target.style.transform = 'scale(1)';
    }
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className="text-white w-full sm:w-auto sm:min-w-[280px] md:min-w-[335px]"
      style={defaultStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

// Custom Date Picker Component
const CustomDatePicker = ({ value, onChange, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    if (value) {
      const date = new Date(value);
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };
    }
    const currentDate = new Date();
    return {
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear()
    };
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const generateDays = () => {
    const days = [];
    const totalDays = daysInMonth(selectedDate.month, selectedDate.year);
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    return days;
  };

        const generateYears = () => {
          const years = [];
          const currentYear = new Date().getFullYear();
          // Generate years from 100 years ago to current year
          for (let i = currentYear - 100; i <= currentYear; i++) {
            years.push(i);
          }
          return years;
        };

  const handleDateChange = (type, value) => {
    const newDate = { ...selectedDate, [type]: value };
    setSelectedDate(newDate);
    
    // Auto-confirm the selection after a short delay
    setTimeout(() => {
      const dateObj = new Date(newDate.year, newDate.month - 1, newDate.day);
      const dateString = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
      console.log('Selected date:', dateString);
      onChange({ target: { value: dateString } });
      onClose();
    }, 500);
  };

  const handleConfirm = () => {
    const dateObj = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
    const dateString = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    console.log('Selected date:', dateString);
    onChange({ target: { value: dateString } });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div 
        className="bg-[#2C1D44]"
        style={{
          width: '100%',
          maxWidth: '375px',
          height: '407px',
          opacity: 1,
          borderWidth: '2px',
          borderTopLeftRadius: '40px',
          borderTopRightRadius: '40px',
          paddingTop: '30px',
          padding: '30px 24px 24px 24px',
          border: '2px solid transparent',
          background: 'linear-gradient(#2C1D44, #2C1D44) padding-box, linear-gradient(270deg, #9569DB 6.53%, #D20E56 91.73%) border-box',
          position: 'relative',
          marginBottom: '0'
        }}
      >
                <div className="text-center mb-4">
                  <h3 
                    className="text-white"
                    style={{
                      fontFamily: 'Proxima Nova',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '18px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      textAlign: 'center',
                      textTransform: 'capitalize',
                      textDecoration: 'underline',
                      textDecorationStyle: 'solid',
                      textDecorationOffset: '0%',
                      textDecorationThickness: '0%'
                    }}
                  >
                    Birthday
                  </h3>
                </div>
        
        <div className="flex justify-center items-start" style={{ gap: '0px', height: 'calc(100% - 60px)', paddingTop: '20px' }}>
          {/* Day Column */}
          <div className="flex-1 max-w-[120px]">
            <div 
              className="text-center text-white mb-2"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                textTransform: 'capitalize',
                textDecoration: 'underline',
                textDecorationStyle: 'solid',
                textDecorationOffset: '0%',
                textDecorationThickness: '0%'
              }}
            >
              Day
            </div>
            <div 
              className="h-48 overflow-y-auto scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              }}
            >
                      {generateDays().map(day => (
                        <div
                          key={day}
                          className="text-center py-2 cursor-pointer text-white"
                          style={{
                            backgroundColor: day === selectedDate.day ? '#402E5C' : 'transparent',
                            fontFamily: 'Proxima Nova',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '18px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            textAlign: 'center',
                            textTransform: 'capitalize',
                            textDecoration: 'underline',
                            textDecorationStyle: 'solid',
                            textDecorationOffset: '0%',
                            textDecorationThickness: '0%'
                          }}
                          onMouseEnter={(e) => {
                            if (day !== selectedDate.day) {
                              e.target.style.backgroundColor = '#402E5C';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (day !== selectedDate.day) {
                              e.target.style.backgroundColor = 'transparent';
                            }
                          }}
                          onClick={() => handleDateChange('day', day)}
                        >
                          {day}
                        </div>
                      ))}
            </div>
          </div>

          {/* Month Column */}
          <div className="flex-1 max-w-[120px]">
            <div 
              className="text-center text-white mb-2"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                textTransform: 'capitalize',
                textDecoration: 'underline',
                textDecorationStyle: 'solid',
                textDecorationOffset: '0%',
                textDecorationThickness: '0%'
              }}
            >
              Month
            </div>
            <div 
              className="h-48 overflow-y-auto scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              }}
            >
                      {months.map((month, index) => (
                        <div
                          key={index}
                          className="text-center py-2 cursor-pointer text-white"
                          style={{
                            backgroundColor: index + 1 === selectedDate.month ? '#402E5C' : 'transparent',
                            fontFamily: 'Proxima Nova',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '18px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            textAlign: 'center',
                            textTransform: 'capitalize',
                            textDecoration: 'underline',
                            textDecorationStyle: 'solid',
                            textDecorationOffset: '0%',
                            textDecorationThickness: '0%'
                          }}
                          onMouseEnter={(e) => {
                            if (index + 1 !== selectedDate.month) {
                              e.target.style.backgroundColor = '#402E5C';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (index + 1 !== selectedDate.month) {
                              e.target.style.backgroundColor = 'transparent';
                            }
                          }}
                          onClick={() => handleDateChange('month', index + 1)}
                        >
                          {month}
                        </div>
                      ))}
            </div>
          </div>

          {/* Year Column */}
          <div className="flex-1 max-w-[120px]">
            <div 
              className="text-center text-white mb-2"
              style={{
                fontFamily: 'Proxima Nova',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                textTransform: 'capitalize',
                textDecoration: 'underline',
                textDecorationStyle: 'solid',
                textDecorationOffset: '0%',
                textDecorationThickness: '0%'
              }}
            >
              Year
            </div>
            <div 
              className="h-48 overflow-y-auto scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              }}
            >
                      {generateYears().map(year => (
                        <div
                          key={year}
                          className="text-center py-2 cursor-pointer text-white"
                          style={{
                            backgroundColor: year === selectedDate.year ? '#402E5C' : 'transparent',
                            fontFamily: 'Proxima Nova',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '18px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            textAlign: 'center',
                            textTransform: 'capitalize',
                            textDecoration: 'underline',
                            textDecorationStyle: 'solid',
                            textDecorationOffset: '0%',
                            textDecorationThickness: '0%'
                          }}
                          onMouseEnter={(e) => {
                            if (year !== selectedDate.year) {
                              e.target.style.backgroundColor = '#402E5C';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (year !== selectedDate.year) {
                              e.target.style.backgroundColor = 'transparent';
                            }
                          }}
                          onClick={() => handleDateChange('year', year)}
                        >
                          {year}
                        </div>
                      ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper components for the form (Refactored to remove layout wrappers)
const InputField = ({ label, id, value, onChange, onClear, required, type = 'text', onDatePickerOpen }) => {
  const handleInputClick = () => {
    if (type === 'date' && onDatePickerOpen) {
      onDatePickerOpen();
    }
  };

  return (
    <div>
      <label 
        htmlFor={id} 
        className="block mb-1 text-sm text-gray-300"
        style={{
          fontFamily: 'Proxima Nova',
          fontWeight: 400
        }}
      >
        {label}{required && <span 
          className="text-red-500"
          style={{
            fontFamily: 'Proxima Nova',
            fontWeight: 400
          }}
        >*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onClick={handleInputClick}
          readOnly={type === 'date'}
          autoComplete="off"
          className="block rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#9569DB] focus:border-transparent cursor-pointer"
          style={{
            backgroundColor: '#402E5C',
            border: '2px solid #9569DB',
            width: '335px',
            height: '50px',
            paddingTop: '14px',
            paddingRight: '15px',
            paddingBottom: '14px',
            paddingLeft: '15px',
            borderRadius: '5px',
            opacity: 1,
            marginBottom: '2px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'Proxima Nova',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '12px',
            lineHeight: '10px',
            letterSpacing: '0%',
            verticalAlign: 'middle'
          }}
        />
        {type === 'date' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {value && type !== 'date' && (
          <button 
            type="button" 
            onClick={() => onClear(id)} 
            className="absolute flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full" 
            style={{ backgroundColor: '#D20E56', top: '50%', right: '12px', transform: 'translateY(-50%)' }}
          >
            {/* --- Replaced IoMdClose Icon with SVG --- */}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2C1D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

const SelectField = ({ label, id, value, onChange, required, children, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleOptionSelect = (optionValue) => {
    onChange({ target: { name: id, value: optionValue } });
    setIsOpen(false);
  };

  const getSelectedLabel = () => {
    if (options.length > 0) {
      const selected = options.find(option => option.value === value);
      return selected ? selected.label : 'Select';
    }
    // Fallback for regular select options
    const selectedOption = Array.from(children).find(child => child.props.value === value);
    return selectedOption ? selectedOption.props.children : 'Select';
  };

  if (options.length > 0) {
    // Custom dropdown for options array
    return (
      <div>
        <label 
          htmlFor={id} 
          className="block mb-1 text-sm text-gray-300"
          style={{
            fontFamily: 'Proxima Nova',
            fontWeight: 400
          }}
        >
          {label}{required && <span 
            className="text-red-500"
            style={{
              fontFamily: 'Proxima Nova',
              fontWeight: 400
            }}
          >*</span>}
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            autoComplete="off"
            className="w-full p-4 rounded-lg text-left cursor-pointer transition-colors duration-200 border-2 border-transparent hover:bg-gray-700 hover:bg-opacity-20"
            style={{
              backgroundColor: '#402E5C',
              border: '2px solid #9569DB',
              width: '335px',
              height: '50px',
              paddingTop: '14px',
              paddingRight: '15px',
              paddingBottom: '14px',
              paddingLeft: '15px',
              borderRadius: '5px',
              opacity: 1,
              marginBottom: '2px',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontFamily: 'Proxima Nova',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '12px',
              lineHeight: '10px',
              letterSpacing: '0%',
              verticalAlign: 'middle'
            }}
          >
            <div className="flex items-center justify-between">
              <p
                className="text-white"
                style={{
                  fontFamily: 'Proxima Nova',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '12px',
                  lineHeight: '10px',
                  letterSpacing: '0%',
                  verticalAlign: 'middle'
                }}
              >
                {getSelectedLabel()}
              </p>
              <svg 
                className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
                style={{ color: '#D20E56' }}
              >
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          {/* Dropdown Options */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-lg overflow-hidden shadow-lg z-10">
              <div 
                className="max-h-80 overflow-y-auto"
                style={{ backgroundColor: '#402E5C' }}
              >
                {options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className={`p-4 cursor-pointer transition-colors duration-200 border-b last:border-b-0 ${
                      value === option.value
                        ? ''
                        : 'hover:bg-gray-700 hover:bg-opacity-20'
                    }`}
                    style={{
                      borderBottomColor: '#9569DB'
                    }}
                  >
                    <p
                      className={`${
                        value === option.value
                          ? 'text-[#D20E56]'
                          : 'text-white'
                      }`}
                      style={{
                        fontFamily: 'Proxima Nova',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '12px',
                        lineHeight: '10px',
                        letterSpacing: '0%',
                        verticalAlign: 'middle'
                      }}
                    >
                      {option.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular select for children
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block mb-1 text-sm text-gray-300"
        style={{
          fontFamily: 'Proxima Nova',
          fontWeight: 400
        }}
      >
        {label}{required && <span 
          className="text-red-500"
          style={{
            fontFamily: 'Proxima Nova',
            fontWeight: 400
          }}
        >*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className="block w-full appearance-none rounded-lg text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#9569DB] focus:border-transparent"
          style={{
            backgroundColor: '#402E5C',
            border: '2px solid #9569DB',
            width: '335px',
            height: '50px',
            paddingTop: '14px',
            paddingRight: '15px',
            paddingBottom: '14px',
            paddingLeft: '15px',
            borderRadius: '5px',
            opacity: 1,
            marginBottom: '2px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'Proxima Nova',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '12px',
            lineHeight: '10px',
            letterSpacing: '0%',
            verticalAlign: 'middle'
          }}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" style={{ color: '#D20E56' }}>
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};


const PersonalInformation = ({ onBackClick, onNext }) => {
  // State for the form
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    birthday: '',
    gender: '',
    unitNumber: '',
    street: '',
    village: '',
    province: '',
    city: '',
    barangay: '',
    zipCode: '',
  });

  // State for eKYC summary
  const [summaryData, setSummaryData] = useState(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [extractedData, setExtractedData] = useState(null);
  const [summaryError, setSummaryError] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  // Dynamic dropdown data
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingBarangays, setIsLoadingBarangays] = useState(false);
  
  // Error states for address APIs
  const [addressError, setAddressError] = useState(null);
  const [serverErrorCount, setServerErrorCount] = useState(0);

  // State for user details submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // State for date picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Get sessionId from localStorage (stored during mobile verification)
  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      // No session ID found, set loading to false and show error
      setIsLoadingSummary(false);
      setSummaryError('No active session found. Please restart the registration process.');
    }
  }, []);

  // Load provinces on component mount
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        setIsLoadingProvinces(true);
        const response = await getProvinces({ sessionId });
        if (response?.data && Array.isArray(response.data)) {
          const provinceOptions = response.data.map(province => ({
            value: province.code,
            label: province.name
          }));
          setProvinces(provinceOptions);
        } else if (Array.isArray(response)) {
          // Handle case where response is directly an array
          const provinceOptions = response.map(province => ({
            value: province.code,
            label: province.name
          }));
          setProvinces(provinceOptions);
        }
      } catch (error) {
        console.error('Error loading provinces:', error);
        
        // Handle different types of errors
        if (error.status >= 500) {
          console.error('Server error loading provinces:', error);
          setServerErrorCount(prev => prev + 1);
          if (serverErrorCount >= 2) {
            setAddressError('Address service is temporarily unavailable. You can still fill in your address manually.');
          }
        } else if (error.status === 401) {
          console.error('Authentication error loading provinces:', error);
          setAddressError('Session expired. Please refresh the page and try again.');
        } else {
          console.error('Client error loading provinces:', error);
        }
        
        // Fallback to empty array - user can still fill manually
        setProvinces([]);
      } finally {
        setIsLoadingProvinces(false);
      }
    };

    if (sessionId) {
      loadProvinces();
    }
  }, [sessionId]);

  // Fetch eKYC summary data
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoadingSummary(true);
        const currentSessionId = sessionId || localStorage.getItem('sessionId');
        
        if (!currentSessionId) {
          setSummaryError('No active session found. Please restart the registration process.');
          return;
        }
        
        const response = await getEkycSummary({ sessionId: currentSessionId });
        setSummaryData(response);
        setExtractedData(response.extractedData);
        setSummaryError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching eKYC summary:', error);
        
        // Handle specific error cases
        if (error.message.includes('session has expired')) {
          setSummaryError('Your session has expired. Please restart the registration process.');
        } else if (error.message.includes('Network error')) {
          setSummaryError('Network error. Please check your connection and try again.');
        } else {
          setSummaryError(error.message || 'Failed to load your information. Please try again.');
        }
        
        // Continue with empty form - user can fill manually
      } finally {
        setIsLoadingSummary(false);
      }
    };

    // Only fetch if we have a session ID
    if (sessionId) {
      fetchSummary();
    }
  }, [sessionId]);


  // Populate form when summary data is available
  useEffect(() => {
    if (summaryData && !isLoadingSummary) {
      const data = summaryData;
      setExtractedData(data.extractedData);
      const formValues = {
        firstName: data.userData?.firstName || data.extractedData?.firstName || '',
        middleName: data.userData?.middleName || data.extractedData?.middleName || '',
        lastName: data.userData?.lastName || data.extractedData?.lastName || '',
        suffix: data.userData?.suffix || '',
        birthday: data.userData?.dateOfBirth
          ? dayjs(data.userData.dateOfBirth).format('YYYY-MM-DD')
          : data.extractedData?.dateOfBirth
          ? dayjs(data.extractedData.dateOfBirth).format('YYYY-MM-DD')
          : '',
        gender: data.userData?.gender || data.extractedData?.gender || '',
      };

      // Set address fields if available
      if (data.userData?.userAddress && data.userData.userAddress.length > 0) {
        const address = data.userData.userAddress[0];
        formValues.unitNumber = address.addressLine1 || '';
        formValues.street = address.addressLine2 || '';
        formValues.village = address.addressLine3 || '';
        formValues.province = address.stateCode || '';
        formValues.city = address.cityCode || '';
        formValues.barangay = address.barangayCode || '';
        formValues.zipCode = address.postalCode || '';

        // Trigger cascading dropdowns for autopopulated address
        if (address.stateCode) {
          fetchCities(address.stateCode).then(() => {
            if (address.cityCode) {
              fetchBarangays(address.cityCode).then(() => {
                if (address.barangayCode) {
                  fetchPostalCode(address.barangayCode);
                }
              });
            }
          });
        }
      }

      setFormData(prevData => ({ ...prevData, ...formValues }));
    }
  }, [summaryData, isLoadingSummary]);

  // Cascading dropdown functions
  const fetchCities = async (provinceCode) => {
    if (!provinceCode) {
      setCities([]);
      setBarangays([]);
      setFormData(prev => ({ ...prev, city: '', barangay: '', zipCode: '' }));
      return;
    }

    try {
      setIsLoadingCities(true);
      const response = await getCities(provinceCode, { sessionId });
      if (response?.data && Array.isArray(response.data)) {
        const cityOptions = response.data.map(city => ({
          value: city.code,
          label: city.name
        }));
        setCities(cityOptions);
      } else if (Array.isArray(response)) {
        // Handle case where response is directly an array
        const cityOptions = response.map(city => ({
          value: city.code,
          label: city.name
        }));
        setCities(cityOptions);
      }
      // Clear dependent dropdowns
      setBarangays([]);
      setFormData(prev => ({ ...prev, city: '', barangay: '', zipCode: '' }));
    } catch (error) {
      console.error('Error loading cities:', error);
      
      // Handle different types of errors
      if (error.status >= 500) {
        console.error('Server error loading cities:', error);
        // Server error - don't show to user, just log and continue
        setCities([]);
      } else if (error.status === 401) {
        console.error('Authentication error loading cities:', error);
        // Authentication error - might need to redirect to login
        setCities([]);
      } else if (error.status === 404) {
        console.error('No cities found for province:', provinceCode);
        // No cities found - this is expected for some provinces
        setCities([]);
      } else {
        console.error('Client error loading cities:', error);
        setCities([]);
      }
    } finally {
      setIsLoadingCities(false);
    }
  };

  const fetchBarangays = async (cityCode) => {
    if (!cityCode) {
      setBarangays([]);
      setFormData(prev => ({ ...prev, barangay: '', zipCode: '' }));
      return;
    }

    try {
      setIsLoadingBarangays(true);
      const response = await getBarangays(cityCode, { sessionId });
      if (response?.data && Array.isArray(response.data)) {
        const barangayOptions = response.data.map(barangay => ({
          value: barangay.code,
          label: barangay.name
        }));
        setBarangays(barangayOptions);
      } else if (Array.isArray(response)) {
        // Handle case where response is directly an array
        const barangayOptions = response.map(barangay => ({
          value: barangay.code,
          label: barangay.name
        }));
        setBarangays(barangayOptions);
      }
      // Clear dependent field
      setFormData(prev => ({ ...prev, barangay: '', zipCode: '' }));
    } catch (error) {
      console.error('Error loading barangays:', error);
      
      // Handle different types of errors
      if (error.status >= 500) {
        console.error('Server error loading barangays:', error);
        // Server error - don't show to user, just log and continue
        setBarangays([]);
      } else if (error.status === 401) {
        console.error('Authentication error loading barangays:', error);
        // Authentication error - might need to redirect to login
        setBarangays([]);
      } else if (error.status === 404) {
        console.error('No barangays found for city:', cityCode);
        // No barangays found - this is expected for some cities
        setBarangays([]);
      } else {
        console.error('Client error loading barangays:', error);
        setBarangays([]);
      }
    } finally {
      setIsLoadingBarangays(false);
    }
  };

  const fetchPostalCode = async (barangayCode) => {
    if (!barangayCode) {
      setFormData(prev => ({ ...prev, zipCode: '' }));
      return;
    }

    try {
      const response = await getPostalCode(barangayCode, { sessionId });
      if (response?.data?.postalCode) {
        setFormData(prev => ({ ...prev, zipCode: response.data.postalCode }));
      } else if (response?.postalCode) {
        // Handle case where postal code is directly in response
        setFormData(prev => ({ ...prev, zipCode: response.postalCode }));
      } else if (typeof response === 'string') {
        // Handle case where response is directly the postal code string
        setFormData(prev => ({ ...prev, zipCode: response }));
      }
    } catch (error) {
      console.error('Error loading postal code:', error);
      
      // Handle different types of errors
      if (error.status >= 500) {
        console.error('Server error loading postal code:', error);
        // Server error - don't show to user, just log and continue
        // Postal code will remain empty, user can fill manually
      } else if (error.status === 401) {
        console.error('Authentication error loading postal code:', error);
        // Authentication error - might need to redirect to login
      } else if (error.status === 404) {
        console.error('Postal code not found for barangay:', barangayCode);
        // No postal code found - this is expected for some barangays
        // Postal code will remain empty, user can fill manually
      } else {
        console.error('Client error loading postal code:', error);
        // Other client errors - postal code will remain empty
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Handle cascading dropdowns
    if (name === 'province') {
      fetchCities(value);
    } else if (name === 'city') {
      fetchBarangays(value);
    } else if (name === 'barangay') {
      fetchPostalCode(value);
    }
  };

  const handleClear = (fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: '',
    }));
  };

  const handleDatePickerOpen = () => {
    setShowDatePicker(true);
  };

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      birthday: value,
    }));
  };

  // Check if all mandatory fields are filled and address APIs are successful
  const isFormValid = () => {
    const requiredFields = [
      'firstName',
      'lastName', 
      'birthday',
      'gender',
      'unitNumber',
      'street',
      'province',
      'city',
      'barangay',
      'zipCode'
    ];

    const allFieldsFilled = requiredFields.every(field => formData[field] && formData[field].trim() !== '');
    
    // Check if address APIs are successful (no server errors and no address errors)
    const addressApisSuccessful = !addressError && serverErrorCount === 0;
    
    return allFieldsFilled && addressApisSuccessful;
  };

  // Handle Next button click - format data and submit to API
  const handleNext = async () => {
    if (!isFormValid() || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Get selected province, city, and barangay objects
      const selectedState = provinces.find(p => p.value === formData.province);
      const selectedCity = cities.find(c => c.value === formData.city);
      const selectedBarangay = barangays.find(b => b.value === formData.barangay);

      // Get extracted data from eKYC summary
      const extractedData = summaryData?.extractedData || summaryData?.userData || {};

      // Format data according to your structure
      const formattedData = {
        firstName: formData.firstName,
        middleName: formData.middleName || "",
        lastName: formData.lastName,
        suffix: formData.suffix || "",
        dateOfBirth: formData.birthday
          ? dayjs(formData.birthday).format("YYYY-MM-DD")
          : null,
        gender: formData.gender,
        docType: extractedData.documentType,
        documentNo: extractedData.documentNumber,
        nationality: extractedData.nationality,
        dateOfExpiry: extractedData.dateOfExpiry,
        userAddresses: [
          {
            addressLine1: formData.unitNumber || "",
            addressLine2: formData.street || "",
            addressLine3: formData.village || "",
            country: "PHL",
            state: selectedState?.label,
            stateCode: selectedState?.value,
            city: selectedCity?.label,
            cityCode: selectedCity?.value,
            barangay: selectedBarangay?.label,
            barangayCode: selectedBarangay?.value,
            postalCode: formData.zipCode,
          },
        ],
      };

      // Debug: Log the formatted data
      console.log('Submitting formatted data:', formattedData);

      // Submit user details
      await submitUserDetails(formattedData, { sessionId });
      
      // If successful, proceed to next page
      onNext();
    } catch (error) {
      console.error('Error submitting user details:', error);
      setSubmitError(error.message || 'Failed to submit user details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div 
        className="flex-1 overflow-y-auto space-y-6 pr-2"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#6b7280 #374151',
          maxHeight: '500px'
        }}
      >
        {/* Personal Information Heading */}
        <div className="text-center">
          <h2
            className="text-white text-lg sm:text-xl whitespace-nowrap"
            style={{ fontFamily: 'Proxima Nova', fontWeight: 500, fontStyle: 'normal' }}
          >
            Personal information
          </h2>
        </div>

        {/* Instruction */}
        <div className="text-center">
          <p 
            className="text-gray-400 text-sm sm:text-base"
            style={{
              fontFamily: 'Proxima Nova',
              fontWeight: 400
            }}
          >
            {isLoadingSummary 
              ? 'Loading your information...' 
              : 'We\'ve scanned your ID and pulled out these details. Take a quick look to make sure they\'re correct.'
            }
          </p>
        </div>

            {/* Error message */}
            {summaryError && (
              <div className="text-center mb-4">
                <p
                  className="text-red-500 text-sm mb-2"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 400
                  }}
                >
                  {summaryError}
                </p>
                <button
                  onClick={() => {
                    setSummaryError(null);
                    const storedSessionId = localStorage.getItem('sessionId');
                    if (storedSessionId) {
                      setSessionId(storedSessionId);
                    }
                  }}
                  className="text-blue-400 text-sm underline hover:text-blue-300"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 400
                  }}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Address API error message */}
            {addressError && (
              <div className="text-center mb-4">
                <p
                  className="text-yellow-500 text-sm mb-2"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 400
                  }}
                >
                  {addressError}
                </p>
                <button
                  onClick={() => {
                    setAddressError(null);
                    setServerErrorCount(0);
                  }}
                  className="text-blue-400 text-sm underline hover:text-blue-300"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 400
                  }}
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* User details submission error message */}
            {submitError && (
              <div className="text-center mb-4">
                <p
                  className="text-red-500 text-sm mb-2"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 400
                  }}
                >
                  {submitError}
                </p>
                <button
                  onClick={() => setSubmitError(null)}
                  className="text-blue-400 text-sm underline hover:text-blue-300"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 400
                  }}
                >
                  Dismiss
                </button>
              </div>
            )}


            {/* Address API loading message */}
            {(isLoadingProvinces || isLoadingCities || isLoadingBarangays) && (
              <div className="text-center mb-4">
                <p
                  className="text-blue-400 text-sm"
                  style={{
                    fontFamily: 'Proxima Nova',
                    fontWeight: 400
                  }}
                >
                  Loading address data... Please wait before proceeding.
                </p>
              </div>
            )}

        {/* Required fields notice */}
        <p 
          className="text-yellow-500"
          style={{
            fontFamily: 'Proxima Nova',
            fontWeight: 400,
            fontSize: '12px'
          }}
        >
          *All fields with * are required
        </p>

        <div className="border-t my-6" style={{ borderColor: 'rgb(64, 46, 92)' }}></div>

        {/* Loading spinner */}
        {isLoadingSummary && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D20E56]"></div>
          </div>
        )}

        {/* Form */}
        {!isLoadingSummary && (
        <div className="space-y-6 flex flex-col items-center">
          {/* Personal Information Section */}
          <div className="space-y-4 w-full max-w-[335px]">
            <h2 
              className="text-xl font-bold text-white"
              style={{ 
                fontFamily: 'Proxima Nova', 
                fontWeight: 500,
                fontStyle: 'normal'
              }}
            >
              Personal information
            </h2>

            <InputField label="First Name" id="firstName" value={formData.firstName} onChange={handleChange} onClear={handleClear} required />
            <InputField label="Middle Name" id="middleName" value={formData.middleName} onChange={handleChange} onClear={handleClear} />
            <InputField label="Last Name" id="lastName" value={formData.lastName} onChange={handleChange} onClear={handleClear} required />
            <InputField label="Suffix" id="suffix" value={formData.suffix} onChange={handleChange} onClear={handleClear} />
            <InputField label="Birthday" id="birthday" value={formData.birthday} onChange={handleChange} onClear={handleClear} required type="date" onDatePickerOpen={handleDatePickerOpen} />
            <SelectField 
              label="Gender" 
              id="gender" 
              value={formData.gender} 
              onChange={handleChange} 
              required
              options={[
                { value: 'M', label: 'M' },
                { value: 'F', label: 'F' },
                { value: 'Other', label: 'Other' }
              ]}
            />
          </div>

          <div className="border-t my-6" style={{ borderColor: 'rgb(64, 46, 92)' }}></div>

          {/* Philippine Address Section */}
          <div className="space-y-4 w-full max-w-[335px]">
            <div className="border-t my-6" style={{ borderColor: 'rgb(64, 46, 92)' }}></div>
            <h2 
              className="text-xl font-bold text-white"
              style={{ 
                fontFamily: 'Proxima Nova', 
                fontWeight: 500,
                fontStyle: 'normal'
              }}
            >
              Philippine Address
            </h2>
            <InputField label="Unit or House number" id="unitNumber" value={formData.unitNumber} onChange={handleChange} onClear={handleClear} required />
            <InputField label="Street" id="street" value={formData.street} onChange={handleChange} onClear={handleClear} required />
            <InputField label="Village / Subdivision" id="village" value={formData.village} onChange={handleChange} onClear={handleClear} />
            <SelectField 
              label="Province" 
              id="province" 
              value={formData.province} 
              onChange={handleChange} 
              required
              options={[
                { value: '', label: isLoadingProvinces ? 'Loading provinces...' : 'Select Province' },
                ...provinces
              ]}
            />
            <SelectField 
              label="City" 
              id="city" 
              value={formData.city} 
              onChange={handleChange} 
              required
              options={[
                { value: '', label: isLoadingCities ? 'Loading cities...' : 'Select City' },
                ...cities
              ]}
            />
            <SelectField 
              label="Barangay" 
              id="barangay" 
              value={formData.barangay} 
              onChange={handleChange} 
              required
              options={[
                { value: '', label: isLoadingBarangays ? 'Loading barangays...' : 'Select Barangay' },
                ...barangays
              ]}
            />
            <InputField label="ZIP code" id="zipCode" value={formData.zipCode} onChange={handleChange} onClear={handleClear} required />
          </div>
        </div>
        )}
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-8">
        <Button 
          type="button"
          onClick={handleNext}
          disabled={!isFormValid() || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Next'}
        </Button>
      </div>

      {/* Custom Date Picker Modal */}
      {showDatePicker && (
        <CustomDatePicker
          value={formData.birthday}
          onChange={handleDateChange}
          onClose={handleDatePickerClose}
        />
      )}
    </div>
  );
};

export default PersonalInformation;

