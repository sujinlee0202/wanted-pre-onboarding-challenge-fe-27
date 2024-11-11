import { Link } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import { readLoginToken } from "../utils/readLoginToken";

const Header = () => {
  const [loginToken, setLoginToken] = useState(readLoginToken);

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    setLoginToken("");
  };

  return (
    <header className='w-full flex items-center justify-between border-b px-4 py-2'>
      <div className='h-11 flex items-center font-bold text-xl'>Todo App</div>
      {loginToken ? (
        <Button
          className='w-[108px] h-8 text-sm text-white bg-red-400'
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      ) : (
        <div className='w-56 h-8 flex gap-2'>
          <Link
            to='/login'
            className='w-full h-full item-middle text-sm text-white bg-blue-400'
          >
            로그인
          </Link>
          <Link
            to='/signup'
            className='w-full h-full item-middle text-sm text-white bg-red-400'
          >
            회원가입
          </Link>
        </div>
      )}
    </header>
  );
};
export default Header;
