import axios from "axios"
import { SportBannerResponse } from "./types"
import { responseToSportBanner } from "./utils"
import { hostApi } from "../const"

const path = "/sport-banners"

export const getSportBanners = async () => {
  try {
    const response = await axios.get<SportBannerResponse>(hostApi + path + "?populate=*")
    return responseToSportBanner(response.data)
  } catch (error) {
    console.error(error)
    return []
  }
}
