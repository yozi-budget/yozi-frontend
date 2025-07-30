import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

const GoogleRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      axios
        .get(`${import.meta.env.VITE_API_SERVER}/auth/google`, {
          params: { code },
        })
        .then((res: AxiosResponse<{ accessToken: string }>) => {
          console.log('구글 로그인 성공:', res.data);
          localStorage.setItem('accessToken', res.data.accessToken);
          navigate('/');
        })
        .catch((err: AxiosError) => {
          console.error(err);
          navigate('/login');
        });
    }
  }, [navigate]);

  return <p>구글 로그인 처리 중입니다...</p>;
};

export default GoogleRedirectPage;
