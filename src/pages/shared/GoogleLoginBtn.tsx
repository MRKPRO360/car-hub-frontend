import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import { useGoogleLoginMutation } from '../../redux/features/auth/authApi';
import { verifyToken } from '../../utils/verifyToken';
import { IUser } from '../../types';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router';

function GoogleLoginBtn() {
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    const toastId = toast.loading('Logging in...');

    try {
      const res = await googleLogin({
        token: credentialResponse.credential,
      }).unwrap();

      const user = verifyToken(res.data.token) as IUser;

      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success('Logged in', { id: toastId, duration: 2000 });
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}

export default GoogleLoginBtn;
