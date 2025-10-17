import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import { initGA, trackPageView } from './config/analytics';

// Import the layout and step components
import AuthLayout from './components/layouts/AuthLayout';
import MobileVerification from './components/MobileVerification';
import OTPVerificationStep from './components/OTPVerificationStep';
import SimRegistrationReminders from './components/SimRegistrationReminders';
import ProvideSimInformation from './components/ProvideSimInformation';
import ScanInformation from './components/ScanInformation';
import ScanIdInformation from './components/ScanIdInformation';
import PersonalInformation from './components/PersonalInformation';
import SupportingDocuments from './components/SupportingDocuments';
import ReviewAndConfirm from './components/ReviewAndConfirm';
import ProcessingSimRegistration from './components/ProcessingSimRegistration';
import SimRegistrationComplete from './components/SimRegistrationComplete';
import CompanyInformation from './components/CompanyInformation';
// import PersonalDetailsStep2 from './components/steps/PersonalDetailsStep2';
// Import other steps here...

const TOTAL_STEPS = 6; // Total number of steps in your flow

// Main App Flow Component
function AppFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  // Track page views when step changes
  useEffect(() => {
    try {
      const stepNames = {
        1: 'Mobile Verification',
        2: 'OTP Verification',
        3: 'SIM Registration Reminders',
        4: 'Provide SIM Information',
        5: 'Scan Information',
        6: 'Processing and Complete'
      };
      
      trackPageView(`/step-${currentStep}-${stepNames[currentStep]}`);
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }, [currentStep]);

  const goToNextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      // Track step completion
      try {
        trackPageView(`/step-${currentStep}-completed`);
      } catch (error) {
        console.warn('Analytics tracking failed:', error);
      }
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      // Track flow completion
      try {
        trackPageView('/flow-completed');
      } catch (error) {
        console.warn('Analytics tracking failed:', error);
      }
      console.log("Flow completed!");
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <MobileVerification onNext={goToNextStep} />;
      case 2:
        return <OTPVerificationStep onNext={goToNextStep} />;
      case 3:
        return <SimRegistrationReminders onNext={goToNextStep} />;
      case 4:
        return <ProvideSimInformation onNext={goToNextStep} />;
      case 5:
        return <ScanInformation onNext={goToNextStep} />;
      case 6:
        return <ScanIdInformation />;
      default:
        return <MobileVerification onNext={goToNextStep} />;
    }
  };
  
  const getStepTitle = () => {
    switch (currentStep) {
        case 1: return "Verify";
        case 2: return "Verify";
        case 3: return "SIM Registration Reminders";
        case 4: return "Provide SIM Information";
        case 5: return "Scan your ID and take a selfie";
        case 6: return "Scan your ID and take a selfie";
        default: return "Verify";
    }
  }

  return (
    <FormProvider>
      <AuthLayout
        currentStep={
          currentStep === 3 ? 2 : (
          currentStep === 2 ? 1 : (
          currentStep === 4 ? 2 : (
          currentStep === 5 ? 3 : (
          currentStep === 6 ? 3 : currentStep))))
        }
        totalSteps={TOTAL_STEPS}
        title={getStepTitle()}
        onBack={currentStep > 1 ? goToPreviousStep : null} // Only show back button after step 1
      >
        {renderStepContent()}
      </AuthLayout>
    </FormProvider>
  );
}


// Supporting Documents Page Component with routing
function SupportingDocumentsPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/personal-information');
  };

  const handleNext = () => {
    navigate('/review-and-confirm');
  };

  return (
    <FormProvider>
      <AuthLayout
        currentStep={4}
        totalSteps={TOTAL_STEPS}
        title="Supporting Documents"
        onBack={handleBackClick}
      >
        <SupportingDocuments onNext={handleNext} />
      </AuthLayout>
    </FormProvider>
  );
}

// Review and Confirm Page Component with routing
function ReviewAndConfirmPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/supporting-documents');
  };

  const handleNext = () => {
    navigate('/processing-sim-registration');
  };

  return (
    <FormProvider>
      <AuthLayout
        currentStep={5}
        totalSteps={TOTAL_STEPS}
        title="Review and Confirm"
        onBack={handleBackClick}
      >
        <ReviewAndConfirm onNext={handleNext} />
      </AuthLayout>
    </FormProvider>
  );
}

// Processing SIM Registration Page Component with routing
function ProcessingSimRegistrationPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/review-and-confirm');
  };

  const handleNext = () => {
    navigate('/sim-registration-complete');
  };

  return (
    <FormProvider>
      <AuthLayout
        currentStep={6}
        totalSteps={TOTAL_STEPS}
        title="Processing SIM Registration"
        onBack={handleBackClick}
      >
        <ProcessingSimRegistration onNext={handleNext} />
      </AuthLayout>
    </FormProvider>
  );
}

// SIM Registration Complete Page Component with routing
function SimRegistrationCompletePage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/processing-sim-registration');
  };

  const handleNext = () => {
    console.log('SIM Registration Complete');
    // Add next step navigation here
  };

  return (
    <FormProvider>
      <AuthLayout
        currentStep={6}
        totalSteps={TOTAL_STEPS}
        title="SIM Registration Complete"
        onBack={handleBackClick}
      >
        <SimRegistrationComplete onNext={handleNext} />
      </AuthLayout>
    </FormProvider>
  );
}







function PersonalInformationPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleNext = () => {
    navigate('/supporting-documents');
  };

  return (
    <FormProvider>
      <AuthLayout
        currentStep={4}
        totalSteps={TOTAL_STEPS}
        title="Enter your details"
        onBack={handleBackClick}
      >
        <PersonalInformation onNext={handleNext} />
      </AuthLayout>
    </FormProvider>
  );
}

function CompanyInformationPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleNext = () => {
    console.log('Company Information completed');
    // Add next step navigation here
  };

  return (
    <FormProvider>
      <AuthLayout
        currentStep={4}
        totalSteps={TOTAL_STEPS}
        title="Company Information"
        onBack={handleBackClick}
      >
        <CompanyInformation onNext={handleNext} />
      </AuthLayout>
    </FormProvider>
  );
}

// Main App Component with Router
function App() {
  // Initialize Google Analytics
  useEffect(() => {
    try {
      initGA();
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppFlow />} />
        <Route path="/personal-information" element={<PersonalInformationPage />} />
        <Route path="/supporting-documents" element={<SupportingDocumentsPage />} />
        <Route path="/review-and-confirm" element={<ReviewAndConfirmPage />} />
        <Route path="/processing-sim-registration" element={<ProcessingSimRegistrationPage />} />
        <Route path="/sim-registration-complete" element={<SimRegistrationCompletePage />} />
        <Route path="/company-information" element={<CompanyInformationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
