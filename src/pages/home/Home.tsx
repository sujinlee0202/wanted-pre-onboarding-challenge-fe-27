import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";

const readLoginToken = () => {
  const loginToken = localStorage.getItem("loginToken");

  return loginToken || "";
};

const Home = () => {
  const [loginToken, setLoginToken] = useState(readLoginToken);

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    setLoginToken("");
  };

  return (
    <main>
      {loginToken ? (
        <Button className='w-full h-11 bg-red-400' onClick={handleLogout}>
          로그아웃
        </Button>
      ) : (
        <div>
          <Link to='/login' className='w-full h-11 bg-blue-400'>
            로그인
          </Link>
          <Link to='/signup' className='w-full h-11 bg-red-400'>
            회원가입
          </Link>
        </div>
      )}
    </main>
  );
};

export default Home;
