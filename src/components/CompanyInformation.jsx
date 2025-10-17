import React, { useState, useRef, useEffect } from 'react';
import Button from './ui/Button';

const CompanyInformation = ({ onNext }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    unitNumber: '',
    street: '',
    village: '',
    province: '',
    city: '',
    barangay: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClear = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: ''
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log('Company Information completed');
    if (onNext) {
      onNext();
    }
  };

  // Input Field Component
  const InputField = ({ label, id, value, onChange, onClear, required, type = 'text' }) => {
    return (
      <div>
        <label className="block text-white text-sm mb-2">
          {label}{required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
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
            required={required}
          />
          {value && (
            <button 
              type="button" 
              onClick={() => onClear(id)} 
              className="absolute flex items-center justify-center w-5 h-5 rounded-full" 
              style={{ backgroundColor: '#D20E56', top: '50%', right: '12px', transform: 'translateY(-50%)' }}
            >
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

  // Select Field Component
  const SelectField = ({ label, id, value, onChange, required, options = [] }) => {
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
      const selected = options.find(option => option.value === value);
      return selected ? selected.label : 'Select';
    };

    return (
      <div>
        <label className="block text-white text-sm mb-2">
          {label}{required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 rounded-lg text-left cursor-pointer transition-colors duration-200 border-2 border-transparent hover:bg-gray-700 hover:bg-opacity-20"
            style={{
              backgroundColor: '#402E5C',
              border: '2px solid #9569DB',
              height: '52px',
              padding: '12px 16px'
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
                      className={`text-sm sm:text-base leading-relaxed ${
                        value === option.value
                          ? 'text-[#D20E56] font-semibold'
                          : 'text-white'
                      }`}
                      style={{
                        fontFamily: 'Proxima Nova',
                        fontWeight: value === option.value ? 600 : 400
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
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div 
        className="flex-1 overflow-y-auto space-y-6 pr-2"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#6b7280 #374151',
          maxHeight: '70vh'
        }}
      >
        {/* Instruction */}
        <div className="text-left">
          <p 
            className="text-gray-400 text-sm sm:text-base"
            style={{
              fontFamily: 'Proxima Nova',
              fontWeight: 400
            }}
          >
            Based on your SIM information, we also need a few more details about your company.
          </p>
        </div>

        {/* Required fields notice */}
        <p 
          className="text-sm text-yellow-500"
          style={{
            fontFamily: 'Proxima Nova',
            fontWeight: 400
          }}
        >
          *All fields with * are required
        </p>

        {/* Form */}
        <div className="space-y-6">
          {/* Company Details Section */}
          <div className="space-y-4">
            <h2
              className="text-white text-lg sm:text-xl whitespace-nowrap"
              style={{ fontFamily: 'Proxima Nova', fontWeight: 500, fontStyle: 'normal' }}
            >
              Company Details
            </h2>

            <InputField 
              label="Company Name" 
              id="companyName" 
              value={formData.companyName} 
              onChange={handleChange} 
              onClear={handleClear} 
              required 
            />
          </div>

          <div className="border-t border-gray-600 my-6"></div>

          {/* Company Location / Work Address Section */}
          <div className="space-y-4">
            <h2
              className="text-white text-lg sm:text-xl whitespace-nowrap"
              style={{ fontFamily: 'Proxima Nova', fontWeight: 500, fontStyle: 'normal' }}
            >
              Company Location / Work Address
            </h2>

            <InputField 
              label="Unit No. or Building Name" 
              id="unitNumber" 
              value={formData.unitNumber} 
              onChange={handleChange} 
              onClear={handleClear} 
              required 
            />
            <InputField 
              label="Street" 
              id="street" 
              value={formData.street} 
              onChange={handleChange} 
              onClear={handleClear} 
              required 
            />
            <InputField 
              label="Village / Subdivision" 
              id="village" 
              value={formData.village} 
              onChange={handleChange} 
              onClear={handleClear} 
            />
            <InputField 
              label="Province" 
              id="province" 
              value={formData.province} 
              onChange={handleChange} 
              onClear={handleClear} 
              required 
            />
            <SelectField 
              label="City" 
              id="city" 
              value={formData.city} 
              onChange={handleChange} 
              required
              options={[
                { value: '', label: 'Select City' },
                { value: 'manila', label: 'Manila' },
                { value: 'quezon-city', label: 'Quezon City' },
                { value: 'makati', label: 'Makati' },
                { value: 'taguig', label: 'Taguig' },
                { value: 'pasig', label: 'Pasig' }
              ]}
            />
            <SelectField 
              label="Barangay" 
              id="barangay" 
              value={formData.barangay} 
              onChange={handleChange} 
              required
              options={[
                { value: '', label: 'Select Barangay' },
                { value: 'barangay-1', label: 'Barangay 1' },
                { value: 'barangay-2', label: 'Barangay 2' },
                { value: 'barangay-3', label: 'Barangay 3' },
                { value: 'barangay-4', label: 'Barangay 4' },
                { value: 'barangay-5', label: 'Barangay 5' }
              ]}
            />
            <InputField 
              label="ZIP code" 
              id="zipCode" 
              value={formData.zipCode} 
              onChange={handleChange} 
              onClear={handleClear} 
              required 
            />
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-center mt-8">
        <Button
          type="button"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CompanyInformation;
