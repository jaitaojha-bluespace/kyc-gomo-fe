import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { 
  IoWifi, 
  IoCellular, 
  IoBatteryFull, 
  IoBatteryHalf, 
  IoBatteryDead 
} from 'react-icons/io5';

// Mobile Status Bar Component
const MobileStatusBar = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [isMobile, setIsMobile] = React.useState(false);
  const [batteryLevel, setBatteryLevel] = React.useState(100);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [connectionType, setConnectionType] = React.useState('unknown');
  const [hasWifi, setHasWifi] = React.useState(true);
  const [hasCellular, setHasCellular] = React.useState(false);
  const [cellularCount, setCellularCount] = React.useState(1); // Number of cellular connections

  React.useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();

    // Time update timer
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Battery API (if available)
    const getBatteryLevel = async () => {
      if ('getBattery' in navigator) {
        try {
          const battery = await navigator.getBattery();
          setBatteryLevel(Math.round(battery.level * 100));
          
          battery.addEventListener('levelchange', () => {
            setBatteryLevel(Math.round(battery.level * 100));
          });
        } catch (error) {
          console.log('Battery API not supported');
        }
      }
    };

    // Network status and connection type detection
    const detectConnectionType = () => {
      try {
        console.log('Starting network detection...');
        
        // Check if WiFi is available
        if ('connection' in navigator) {
          const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
          console.log('Connection object:', connection);
          
          if (connection) {
            const connType = connection.effectiveType || connection.type || 'unknown';
            setConnectionType(connType);
            
            console.log('Connection details:', {
              type: connection.type,
              effectiveType: connection.effectiveType,
              connType: connType,
              downlink: connection.downlink,
              rtt: connection.rtt
            });
            
            // Determine WiFi availability
            if (connection.type === 'wifi' || connection.effectiveType === 'wifi') {
              setHasWifi(true);
              console.log('WiFi detected');
            } else {
              // For now, assume WiFi is available if we're on a desktop-like connection
              const isLikelyWiFi = !connection.type || 
                                   connection.type === 'unknown' || 
                                   connection.effectiveType === '4g' || 
                                   connection.effectiveType === '3g' ||
                                   connection.downlink > 10; // High speed likely means WiFi
              
              if (isLikelyWiFi) {
                setHasWifi(true);
                console.log('Likely WiFi connection detected');
              } else {
                setHasWifi(false);
                console.log('No WiFi detected');
              }
            }
            
            // Determine cellular connections based on SIM count
            // This simulates the number of SIM cards in the device
            let cellularConnections = 1; // Default to 1 SIM
            
            // SIM detection based on device characteristics
            // 
            // PRODUCTION IMPLEMENTATION NOTES:
            // ================================
            // In production, replace this simulation with real SIM detection:
            // 
            // 1. Web APIs (Limited but available):
            //    - navigator.connection.effectiveType
            //    - navigator.connection.downlink
            //    - navigator.connection.rtt
            // 
            // 2. Native App Integration (Recommended):
            //    - React Native: @react-native-community/netinfo
            //    - Cordova/PhoneGap: cordova-plugin-sim
            //    - Capacitor: @capacitor/network
            // 
            // 3. Server-Side Detection:
            //    - User-Agent analysis
            //    - IP geolocation
            //    - Device fingerprinting
            // 
            // 4. Hybrid Approach:
            //    - WebView bridge to native code
            //    - Custom native modules
            // 
            if (isMobile) {
              // For mobile devices, detect SIM count based on device type
              // This is a simplified simulation - in production you'd use:
              // - navigator.connection for network info
              // - Device-specific APIs for SIM detection
              // - User agent analysis for device capabilities
              
              // Simulate realistic SIM distribution
              const deviceType = navigator.userAgent.toLowerCase();
              let simCount = 1; // Default to single SIM
              
              // Android devices more likely to have dual SIM
              if (deviceType.includes('android')) {
                simCount = Math.random() > 0.3 ? 2 : 1; // 70% chance of dual SIM
              }
              // iPhone typically single SIM (except some models)
              else if (deviceType.includes('iphone')) {
                simCount = Math.random() > 0.9 ? 2 : 1; // 10% chance of dual SIM
              }
              // Other mobile devices
              else {
                simCount = Math.random() > 0.5 ? 2 : 1; // 50% chance of dual SIM
              }
              
              cellularConnections = simCount;
            } else {
              // Desktop - no cellular connection
              cellularConnections = 0;
            }
            
            setCellularCount(cellularConnections);
            setHasCellular(cellularConnections > 0);
            
            console.log(`SIM cards detected: ${cellularConnections}`);
            
          } else {
            // No connection info - assume WiFi available, cellular based on device
            setHasWifi(true);
            const simCount = isMobile ? 1 : 0;
            setHasCellular(simCount > 0);
            setCellularCount(simCount);
            console.log(`No connection info - assuming WiFi + ${simCount} SIM(s)`);
          }
        } else {
          // No connection API - assume WiFi available, cellular based on device
          setHasWifi(true);
          const simCount = isMobile ? 1 : 0;
          setHasCellular(simCount > 0);
          setCellularCount(simCount);
          console.log(`No connection API - assuming WiFi + ${simCount} SIM(s)`);
        }
      } catch (error) {
        // Fallback in case of any errors
        console.warn('Network detection error:', error);
        setHasWifi(true);
        const simCount = isMobile ? 1 : 0;
        setHasCellular(simCount > 0);
        setCellularCount(simCount);
      }
    };

    const handleOnline = () => {
      setIsOnline(true);
      detectConnectionType();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setHasWifi(false);
      setHasCellular(false);
      setCellularCount(0);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial connection detection
    detectConnectionType();

    getBatteryLevel();

            // Handle window resize for responsive detection
            const handleResize = () => {
              detectConnectionType();
            };

            window.addEventListener('resize', handleResize);

            return () => {
              clearInterval(timer);
              window.removeEventListener('online', handleOnline);
              window.removeEventListener('offline', handleOffline);
              window.removeEventListener('resize', handleResize);
            };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getBatteryIcon = () => {
    if (batteryLevel > 75) return <IoBatteryFull size={16} className="text-white sm:w-5 sm:h-5" style={{ color: '#ffffff' }} />;
    if (batteryLevel > 25) return <IoBatteryHalf size={16} className="text-white sm:w-5 sm:h-5" style={{ color: '#ffffff' }} />;
    return <IoBatteryDead size={16} className="text-white sm:w-5 sm:h-5" style={{ color: '#ffffff' }} />;
  };

  const getWifiIcon = () => {
    if (!hasWifi) return null;
    return <IoWifi size={16} className={isOnline ? "text-white" : "text-gray-500"} />;
  };

  const getCellularIcon = () => {
    if (!hasCellular) return null;
    return <IoCellular size={16} className={isOnline ? "text-white" : "text-gray-500"} />;
  };

  const getNetworkIcons = () => {
    const icons = [];
    
    // Add WiFi icon if available
    if (hasWifi) {
      icons.push(
        <IoWifi 
          key="wifi" 
          size={16} 
          className="text-white sm:w-5 sm:h-5" 
          style={{ color: '#ffffff' }}
        />
      );
    }
    
    // Add multiple cellular icons based on connection count
    if (hasCellular) {
      for (let i = 0; i < cellularCount; i++) {
        icons.push(
          <IoCellular 
            key={`cellular-${i}`} 
            size={16} 
            className="text-white sm:w-5 sm:h-5" 
            style={{ color: '#ffffff' }}
          />
        );
      }
    }
    
    return icons;
  };

  return (
    <div 
      className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-white text-xs sm:text-sm w-full"
      style={{ 
        borderRadius: '24px 24px 0 0',
        minHeight: '40px',
        backgroundColor: '#2C1D44',
        position: 'relative',
        zIndex: 10,
        fontFamily: 'Proxima Nova',
        fontWeight: 400
      }}
    >
      {/* Left side - Time only */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <span className="font-semibold">{formatTime(currentTime)}</span>
      </div>
      
      {/* Right side - Status indicators */}
      <div className="flex items-center space-x-0.5 sm:space-x-1">
        {/* Network Icons - Shows WiFi and/or Cellular based on availability */}
        {getNetworkIcons()}
        
        {/* Battery */}
        {getBatteryIcon()}
      </div>
    </div>
  );
};

// Reusable Header
const Header = ({ currentStep, totalSteps, title, onBack }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <header className="w-full px-3 py-4">
      {/* Progress Indicators */}
      <div className="flex w-full items-center justify-center mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                step <= currentStep ? '' : ''
              }`}
              style={step <= currentStep ? { backgroundColor: '#D20E56' } : { backgroundColor: '#402E5C' }}
            />
            {index < steps.length - 1 && (
              <div
                className={`w-6 h-0.5 ${
                  step < currentStep ? '' : ''
                }`}
                style={step < currentStep ? { backgroundColor: '#D20E56' } : { backgroundColor: '#402E5C' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Header with Back Button and Title */}
      <div className="relative flex items-center justify-between">
        <button onClick={onBack} className="disabled:opacity-50" disabled={!onBack} style={{ color: '#D20E56' }}>
          <IoIosArrowBack size={20} />
        </button>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 
            className="text-white text-lg whitespace-nowrap"
            style={{
              fontFamily: 'Proxima Nova',
              fontWeight: 700,
              fontStyle: 'Bold',
              fontSize: '20px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center'
            }}
          >
            {currentStep} {title}
          </h1>
        </div>
        <div className="w-5"></div> {/* Spacer for centering */}
      </div>
    </header>
  );
};


// The Main Layout Component
const AuthLayout = ({ children, currentStep, totalSteps, title, onBack }) => {
  return (
    <div className="flex min-h-screen w-full justify-center items-center p-1">
      <div 
        className="flex flex-col bg-[#2C1D44] shadow-2xl overflow-hidden" 
        style={{ 
          borderRadius: '24px',
          width: '375px',
          height: '812px'
        }}
      >
        {/* Mobile Status Bar */}
        <MobileStatusBar />
        
        <Header
          currentStep={currentStep}
          totalSteps={totalSteps}
          title={title}
          onBack={onBack}
        />
        {/* This is where the different page content will be rendered */}
        <main className="flex w-full flex-1 flex-col justify-between p-3" style={{ paddingBottom: '8rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
