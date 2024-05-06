import Header from "@components/Header";
import "@/styles/Content.scss";

const ContentPage = () => {
  return (
    <div className="ContentPage">
      <Header centerText="컨텐츠" />
      <div className="content-item">
        <div className="quiz-border">
          <p>퀴즈</p>
        </div>
        <div className="game1-border">
          <p>게임 1</p>
        </div>
        <div className="game2-border">
          <p>게임 2</p>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
