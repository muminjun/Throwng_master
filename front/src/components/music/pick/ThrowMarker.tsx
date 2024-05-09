import "@components/music/pick/ThrowMarker.scss";
import logo from "@assets/images/logo.png";
import { useEffect, useState } from "react";
import white from "@assets/images/aaa.png";

const ThrowMarker = () => {
  // const [bounce, setBounce] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setBounce(true);
  //   }, 600); // 애니메이션 지속 시간과 일치시킴 (0.6초)
  // }, []);

  return (
    <div className="ThrowMarker">
      <div className="wrapper">
        {/* <div className={`text-container text-drop`}>THROWNG</div> */}
        <div className={`image-container image-rise`}>
          <img src={logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default ThrowMarker;
