import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AutoGemzLeftSide from '../components/AutoGemzLeftSide';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../store/thunks/authThunks';
import type { AppDispatch } from '../store';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  
  // Redirect if already authenticated is now handled by PublicRoute wrapper in App.tsx
  
  const handleSubmit = async (values: { email: string; password: string; role: string }) => {
    setError(null);
    try {
      await dispatch(loginUser({ ...values, role: values.role as 'inspector' | 'admin' })).unwrap();
      
      // Navigate based on the role selected in the login form
      if (values.role === 'inspector') {
        navigate('/inspector', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error: any) {
      setError(error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen relative" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(120deg, #000000 0%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0) 100%)'
      }}></div>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-7xl flex shadow-2xl rounded-lg overflow-hidden">
          <AutoGemzLeftSide />
          <AuthForm type="login" onSubmit={handleSubmit} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Login;
