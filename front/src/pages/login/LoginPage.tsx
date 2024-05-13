import logo from "@assets/images/logo.png";
import SocialKakao from "@components/auth/SocialKakao";
import "@styles/LoginPage.scss";

const LoginPage = () => {
  // localStorage.setItem(
  //   "jwt",
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIzNDU2NjQ4NDMyIiwic3ViIjoiYWNjZXNzVG9rZW4iLCJpYXQiOjE3MTU1NjQ3NzQsImV4cCI6MTcxNTU2NDgzNH0.7lC_oqJL-lmvHdv13EUSRGrY9Gzr5mXhHcCSkB6a05w"
  // );

  return (
    <div className="LoginPage">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <SocialKakao />
    </div>
  );
};

export default LoginPage;
