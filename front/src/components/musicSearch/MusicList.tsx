import { useNavigate } from "react-router-dom"
import {Song} from "../../types/songType.ts"
import SearchedWords from "./SearchedWords.tsx"
import "@styles/musicSearch/MusicList.scss"

interface Props {
  searchResults?: Song[],
  onWordClick: (title: string) => void,
}

const MusicList = ({searchResults, onWordClick}:Props) => {
  const navigate = useNavigate();

  const handleGoNavigation = (song : Song) => {
    navigate(`/music/drop/${song.youtubeId}`, {state: {song:song}})
  }

  return (
    <div className="MusicList">
      {searchResults && searchResults.length > 0 ? (
        <div className="searchResults">
          {searchResults.map((song, index:number) => (
            <div key={index} className="result-item" onClick={() => handleGoNavigation(song)}>
              
              <div className="image-container">
                <img src={song.albumImage}/>
              </div>

              <div className="item-wide">
                <div className="item-detail">
                  <div className="item-title">{song.title}</div>
                  <div className="item-artist">{song.artist}</div>
                </div>
                <div className="item-length">{song.playTime}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <SearchedWords onWordClick={onWordClick} />
      )}
    </div>
  )
}

export default MusicList