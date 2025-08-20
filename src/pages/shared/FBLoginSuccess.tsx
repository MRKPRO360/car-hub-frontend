import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { verifyToken } from '../../utils/verifyToken';
import { setUser } from '../../redux/features/auth/authSlice';

function FBLoginSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log('ok');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      const user = verifyToken(token);
      console.log({ user });

      dispatch(setUser({ user, token }));
      setTimeout(() => navigate('/dashboard'), 50);
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);
  return <div>Logging you in...</div>;
}

export default FBLoginSuccess;
