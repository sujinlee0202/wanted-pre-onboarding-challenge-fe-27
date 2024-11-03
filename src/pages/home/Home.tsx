import { Link } from "react-router-dom";
import Button from "../../components/Button";

const Home = () => {
  return (
    <main>
      <Link to='/login'>
        <Button className='w-full h-11 bg-blue-400'>로그인</Button>
      </Link>
      <Link to='/signup'>
        <Button className='w-full h-11 bg-red-400'>회원가입</Button>
      </Link>
    </main>
  );
};
export default Home;
