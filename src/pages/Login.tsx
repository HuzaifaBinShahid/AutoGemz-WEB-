import { useNavigate } from 'react-router-dom';
import AutoGemzLeftSide from '../components/AutoGemzLeftSide';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log('Login values:', values);
    navigate('/dashboard');
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
          <AuthForm type="login" onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Login;
