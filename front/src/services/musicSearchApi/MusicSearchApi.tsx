import { axiosApi } from "@/utils/common";
import { DropSong, Song } from "../../types/songType"

const api = axiosApi()

const getSearchMusic = async(data:string)=> {
  try {
    const res = await api.get<Song[]>(`/music/search/${data}`)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const postThrowngMusic = async(youtubeId:string, data:DropSong)=> {
  try {
    const res = await api.post(`/music/thrown/${youtubeId}`, data);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}


export {
  getSearchMusic,
  postThrowngMusic,
}