# GOMO Frontend - KYC SIM Registration

A React-based frontend application for GOMO SIM registration with KYC (Know Your Customer) functionality, featuring document capture, face verification, and mobile number validation.

## 🚀 Features

- **Mobile Verification**: Phone number validation with automatic 0-to-9 replacement
- **Document Capture**: Auto-capture of ID documents using Innovatrics DOT technology
- **Face Verification**: Biometric face capture and verification
- **Smile Liveness**: Anti-spoofing liveness detection
- **OTP Verification**: SMS-based one-time password verification
- **Multi-step Registration**: Complete SIM registration flow
- **Responsive Design**: Mobile-first responsive UI
- **Analytics Integration**: Google Analytics 4 tracking

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.9
- **Styling**: Tailwind CSS 4.1.14
- **Routing**: React Router DOM 7.9.4
- **Icons**: React Icons 5.5.0
- **Biometrics**: Innovatrics DOT SDK
- **Analytics**: React GA4 2.1.0
- **Encryption**: CryptoJS 2.5.3

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kyc-gomo-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run start` - Start production server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📱 Key Components

### Mobile Verification
- **File**: `src/components/MobileVerification.jsx`
- **Features**:
  - Mobile number input with +63 country code
  - Automatic replacement of numbers starting with 0 to 9
  - Real-time validation
  - Terms and conditions agreement

### Document Capture
- **Files**: `src/components/DocumentAutoCapture.jsx`, `DocumentCamera.jsx`, `DocumentUi.jsx`
- **Features**:
  - Auto-capture of ID documents
  - Real-time document detection
  - Image quality validation

### Face Verification
- **Files**: `src/components/FaceAutoCapture.jsx`, `FaceCamera.jsx`, `FaceUi.jsx`
- **Features**:
  - Biometric face capture
  - Liveness detection
  - Anti-spoofing measures

### Smile Liveness
- **Files**: `src/components/SmileLiveness.jsx`, `SmileLivenessCamera.jsx`, `SmileLivenessUi.jsx`
- **Features**:
  - Smile-based liveness verification
  - Anti-fraud protection

## 🔧 Configuration

### Vite Configuration
The project uses Vite with the following configuration:
- **Port**: 3000 (configurable)
- **Proxy**: API requests to `https://devapi.bluwyre.ai/v1`
- **Build Output**: `build/` directory

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=https://devapi.bluwyre.ai
VITE_GA_TRACKING_ID=your-ga-tracking-id
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   └── layouts/         # Layout components
├── config/              # Configuration files
│   ├── analytics.js     # Analytics setup
│   └── api.js          # API configuration
├── context/             # React context providers
├── services/            # API service functions
├── styles/              # CSS modules
└── utils/               # Utility functions
```

## 🔌 API Integration

The application integrates with the following APIs:
- **Mobile Verification**: Phone number validation
- **OTP Services**: Send and verify OTP codes
- **Document Processing**: Document capture and validation
- **Face Verification**: Biometric verification
- **Registration**: Complete SIM registration

## 🎨 Styling

The project uses Tailwind CSS for styling with custom configurations:
- **Primary Colors**: Purple (#9569DB), Pink (#D20E56), Yellow (#FFD71F)
- **Background**: Dark theme with gradient backgrounds
- **Typography**: Proxima Nova font family
- **Responsive**: Mobile-first design approach

## 📊 Analytics

Google Analytics 4 is integrated for tracking:
- User interactions
- Form completions
- Error tracking
- Performance metrics

## 🚀 Deployment

### Docker Deployment
```bash
# Build Docker image
docker build -t gomo-fe .

# Run container
docker run -p 3000:3000 gomo-fe
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔒 Security Features

- **Data Encryption**: Sensitive data encryption using CryptoJS
- **Input Validation**: Client-side validation for all inputs
- **Secure API**: HTTPS API endpoints
- **Session Management**: Secure session handling

## 📱 Mobile Optimization

- **Responsive Design**: Optimized for mobile devices
- **Touch Interactions**: Touch-friendly interface
- **Camera Integration**: Native camera access for document/face capture
- **Performance**: Optimized for mobile performance

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill existing processes
   pkill -f "vite"
   # Or use different port
   npm run dev -- --port 3001
   ```

2. **Camera Not Working**
   - Ensure HTTPS in production
   - Check browser permissions
   - Verify camera access

3. **API Errors**
   - Check network connectivity
   - Verify API endpoint configuration
   - Check browser console for errors

## 📄 License

This project is private and proprietary to BlueSpace Labs.

## 🤝 Contributing

This is a private project. For internal development:
1. Create feature branches
2. Follow coding standards
3. Test thoroughly
4. Submit pull requests for review

## 📞 Support

For technical support or questions, contact the development team at BlueSpace Labs.

---

**Version**: 0.1.0  
**Last Updated**: December 2024  
**Maintained by**: BlueSpace Labs Development Team