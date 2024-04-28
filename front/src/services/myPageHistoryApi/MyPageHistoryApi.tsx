import { axiosApi } from "@/utils/common";
import { MyPickHistory, MyThrowHistory } from "../../types/songType";
import { MyLevel } from "../../types/myPage";

const api = axiosApi()

const getMyDropHistory = async() => {
  try {
    const res = await api.get<MyThrowHistory[]>(`/users/user/thrown-music`)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getMyPickHistory = async() => {
  try {
    const res = await api.get<MyPickHistory[]>(`/users/user/picked-music`)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

const getMyLevel = async() => {
  try {
    const res = await api.get<MyLevel>(`/users/user/profile`)
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export {
  getMyDropHistory, 
  getMyPickHistory,
  getMyLevel,
}