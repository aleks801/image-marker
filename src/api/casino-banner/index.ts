import axios from "axios"
import { CasinoBannerResponse } from "./types"
import { responseToCasinoBanner } from "./utils"
import { hostApi } from "../const"

const path = "/casino-banners"

export const getCasinoBanners = async () => {
  try {
    const response = await axios.get<CasinoBannerResponse>(hostApi + path + "?populate=*")
    return responseToCasinoBanner(response.data)
  } catch (error) {
    console.error(error)
    return []
  }
}
