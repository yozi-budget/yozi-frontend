import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const KakaoRedirectPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');
        if (code) {
            axios
                .post(`${import.meta.env.VITE_API_SERVER}/auth/kakao`, { code })
                .then((res) => {
                console.log('로그인 성공:', res.data);
                localStorage.setItem('accessToken', res.data.accessToken);
                navigate('/');
            })
                .catch((err) => {
                console.error(err);
                navigate('/login');
            });
        }
    }, [navigate]);
    return _jsx("p", { children: "\uB85C\uADF8\uC778 \uCC98\uB9AC \uC911\uC785\uB2C8\uB2E4..." });
};
export default KakaoRedirectPage;
