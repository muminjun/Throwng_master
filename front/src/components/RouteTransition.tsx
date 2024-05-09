import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "@styles/Transition.scss";
import { useState } from "react";

const RouteTransition = () => {
  const [exitAnimation, setExitAnimation] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setExitAnimation(true);
    setTimeout(() => {
      navigate("/");
      setExitAnimation(false);
    }, 10000);
  };

  return (
    <>
      <button onClick={handleButtonClick}>줍기 버튼</button>
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames={exitAnimation ? "slide" : ""}
          timeout={10000}
          in={false}
          unmountOnExit={true}
        >
          <div>
            <Outlet />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
};

export default RouteTransition;
