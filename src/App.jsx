import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#123528',
            color: '#fdfcf8',
            fontSize: '15px',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: '0 20px 40px -10px rgba(12,32,24,0.3)',
          },
          success: {
            iconTheme: {
              primary: '#e6ad2e',
              secondary: '#123528',
            },
          },
          error: {
            iconTheme: {
              primary: '#c2603a',
              secondary: '#fff',
            },
          },
        }}
      />
      <AppRoutes />
    </AuthProvider>
  );
}
