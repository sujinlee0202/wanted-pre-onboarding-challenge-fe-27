import { twMerge } from "tailwind-merge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { LoginForm } from "../../types/auth";
import { fetchLogin } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { readLoginToken } from "../../utils/readLoginToken";

const Login = () => {
  const [formState, setFormState] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  // loginToken이 존재할 경우 루트 경로로 리다이렉트
  useEffect(() => {
    const loginToken = readLoginToken();

    if (loginToken !== "") {
      navigate("/");
    }
  }, []);

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    validateForm({ ...formState, [e.target.name]: e.target.value });
  };

  // 폼 유효성 검사 함수
  const validateForm = (formState: LoginForm) => {
    const EmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;
    const emailValid = EmailRegex.test(formState.email);
    const passwordValid = formState.password.length >= 8;
    const isValidateFormState = emailValid && passwordValid;

    // 유효성 검사 통과 시 버튼 활성화
    setIsActive(isValidateFormState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // login api 호출
    fetchLogin(formState.email, formState.password)
      .then((data) => {
        // 로그인 성공 시 응답받은 토큰을 로컬스토리지에 저장
        const token = data.token;
        localStorage.setItem("loginToken", token);
        navigate("/"); // 로그인 성공 시 home으로 이동
      })
      .catch(() => {
        // 로그인 실패 시 경고창을 띄우고 login페이지로 리다이렉트
        alert("아이디 또는 비밀번호가 유효하지 않습니다.");
        navigate("/login");
      });
  };

  return (
    <div className='flex flex-col items-center w-[512px] mx-auto pt-10'>
      <p className='text-3xl font-bold pb-10'>로그인</p>
      <form
        className='flex flex-col gap-2 w-full'
        onSubmit={handleSubmit}
        noValidate
      >
        <div className='flex flex-col gap-1'>
          <p className='font-bold'>이메일</p>
          <Input
            type='email'
            name='email'
            className='w-full h-11'
            value={formState.email}
            onChange={onChangeInputs}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <p className='font-bold'>비밀번호</p>
          <Input
            type='password'
            name='password'
            className='w-full h-11'
            value={formState.password}
            onChange={onChangeInputs}
          />
        </div>

        <Button
          className={twMerge(
            "w-full h-11 bg-blue-400 rounded-xl text-white font-bold my-4",
            isActive && "bg-blue-600"
          )}
          disabled={!isActive}
        >
          로그인
        </Button>
      </form>
    </div>
  );
};
export default Login;
