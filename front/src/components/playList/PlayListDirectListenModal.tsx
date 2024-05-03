import "@styles/playList/PlayListDirectListenModal.scss"
import { Content } from "../../types/songType"
import youtubeMusic from "@assets/images/youtubeMusic.webp"
import { useSetRecoilState } from "recoil"
import { speedListenModal } from "@store/playList/atoms"

interface Props {
  song:Content
}

const PlayListDirectListenModal = ({song}:Props) => {
  const setSpeedModal = useSetRecoilState(speedListenModal);

  const listenSong = (song: Content) => {
    const musicName = encodeURIComponent(song.title);
    const artistName = encodeURIComponent(song.artist);
    const youtubeMusicAppURL = `youtubemusic://search?q=${musicName}-${artistName}`;
    const youtubeMusicWebURL = `https://music.youtube.com/search?q=${musicName}-${artistName}`;

    window.location.href = youtubeMusicAppURL;

    setTimeout(() => {
      window.location.href = youtubeMusicWebURL;
    }, 1500);
  };

  return (
    <div className="PlayListDirectListenModal">
      <div onClick={() => setSpeedModal(null)}></div>
      <div onClick={() => listenSong(song)} className="modal-body">
        <div className="img-container">
          <img src={youtubeMusic} alt="" />
        </div>
        <div>바로 듣기</div>
      </div>
    </div>
  )
}

export default PlayListDirectListenModal