import { useRef, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { addressState, locationState } from "@store/map/atoms";
import { postThrowngMusic } from "@services/musicSearchApi/MusicSearchApi";
import { musicDropImage, userImageURL } from "@store/musicSearch/atoms";
import { useNavigate } from "react-router-dom";
import { selectMusic } from "@store/music/drop/atoms";
import MusicDropBtn from "./MusicDropBtn";
import "@styles/musicDrop/MusicDropBody.scss";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const MusicDropBody = ({ setIsLoading }: Props) => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const inputEl = useRef<HTMLTextAreaElement>(null);
  const myLocation = useRecoilValue(locationState);
  const myAddress = useRecoilValue(addressState);
  const imageUrl = useRecoilValue(userImageURL);
  const navigate = useNavigate();
  const songInfo = useRecoilValue(selectMusic);
  const resetUserImage = useResetRecoilState(userImageURL);
  const resetImagePreview = useResetRecoilState(musicDropImage);

  const textOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 50) {
      setText(e.target.value);
      setCount(e.target.value.length);
    } else {
      alert("텍스트는 최대 50자까지 입력 가능합니다.");
    }
  };

  const postThrownSong = async (e: React.MouseEvent<HTMLDivElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (text.trim().length === 0) {
      alert(
        "노래, 현재 감정, 상황, 관련 에피소드, 거리, 가수 등 떠오르는 말을 적어보세요."
      );
      setIsLoading(false);
      return;
    }

    const requestBody = {
      longitude: myLocation.lng,
      latitude: myLocation.lat,
      location: myAddress,
      comment: text.trim(),
      title: songInfo.title,
      imageUrl: imageUrl,
      artist: songInfo.artist,
      albumImageUrl: songInfo.albumImage,
    };

    await postThrowngMusic(songInfo.youtubeId, requestBody);
    resetUserImage();
    resetImagePreview();
    navigate("/", { replace: true });
  };

  return (
    <div className="MusicDropBody">
      <div className="header">
        <p>
          <span>{myAddress}</span>에
        </p>
        음악을 두고 갈까요?
      </div>
      <form className="form-div">
        <div className="div">
          <div className="input-div">
            <textarea
              onChange={textOnChange}
              placeholder="노래, 현재 감정, 상황, 관련 에피소드, 거리, 가수 등 떠오르는 말을 적어보세요."
              value={text}
              maxLength={50}
              className="input-area"
              ref={inputEl}
              required
            />
            <div className="input-count">{count}/50</div>
          </div>
          <div className="warning-msg">
            텍스트 및 사진은 생략이 가능하며 욕설, 성희롱, 비방과 같은 내용은
            삭제됩니다.
          </div>
        </div>
        <MusicDropBtn onClick={postThrownSong} btnText="쓰롱하기" />
      </form>
      {/* <div className="body">
        
      </div> */}
    </div>
  );
};

export default MusicDropBody;
