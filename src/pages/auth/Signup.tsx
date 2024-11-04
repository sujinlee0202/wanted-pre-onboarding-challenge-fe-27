import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { SignupForm } from "../../types/auth";
import { fetchSignup } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formState, setFormState] = useState<SignupForm>({
    email: "",
    password: "",
    password_confirm: "",
  });
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    validateForm({ ...formState, [e.target.name]: e.target.value });
  };

  // 폼 유효성 검사 함수
  const validateForm = (formState: SignupForm) => {
    const EmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/;
    const emailValid = EmailRegex.test(formState.email);
    const passwordValid = formState.password.length >= 8;
    const passwordConfirmValid = formState.password_confirm.length >= 8;
    const isValidateFormState =
      emailValid && passwordValid && passwordConfirmValid;

    // 유효성 검사 통과 시 버튼 활성화
    setIsActive(isValidateFormState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 비밀번호와 비밀번호 확인이 일치할 경우 회원가입 진행
    if (formState.password === formState.password_confirm) {
      fetchSignup(formState.email, formState.password).then(() =>
        // 회원가입 성공 시 로그인 페이지로 이동
        navigate("/login")
      );
    } else {
      alert("비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className='flex flex-col items-center w-[512px] mx-auto pt-10'>
      <p className='text-3xl font-bold pb-10'>회원가입</p>
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

        <div className='flex flex-col gap-1'>
          <p className='font-bold'>비밀번호 확인</p>
          <Input
            type='password'
            name='password_confirm'
            className='w-full h-11'
            value={formState.password_confirm}
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
          회원가입 하기
        </Button>
      </form>
    </div>
  );
};
export default Signup;
