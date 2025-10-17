import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  disabled = false, 
  onClick, 
  className = '', 
  style = {},
  ...props 
}) => {
  const defaultStyle = {
    width: '100%',
    maxWidth: '335px',
    height: '45px',
    borderRadius: '40px',
    paddingTop: '12px',
    paddingRight: '24px',
    paddingBottom: '12px',
    paddingLeft: '24px',
    background: disabled 
      ? 'linear-gradient(96.14deg, #D20E56 31.04%, #9569DB 100.11%)' 
      : 'linear-gradient(96.14deg, #D20E56 31.04%, #9569DB 100.11%)',
    boxShadow: disabled 
      ? 'none' 
      : '0px 0px 5.53px 1.38px #D20E5680',
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: '14px',
    lineHeight: '140%',
    letterSpacing: '0.2px',
    textAlign: 'center',
    verticalAlign: 'middle',
    textTransform: 'capitalize',
    opacity: disabled ? 0.5 : 1,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform 0.2s ease',
    ...style
  };

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
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
      type={type}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`text-white w-full sm:w-auto sm:min-w-[280px] md:min-w-[335px] ${className}`}
      style={defaultStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
