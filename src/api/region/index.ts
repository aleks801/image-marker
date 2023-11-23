import axios from "axios"
import { responseObjToRegion } from "./utils"
import { RegionResponseObj } from "../types"
import { hostApi } from "../const"

const path = "/regions"

export const getRegions = async () => {
  try {
    const response = await axios.get<RegionResponseObj>(hostApi + path)
    return responseObjToRegion(response.data)
  } catch (error) {
    return []
  }
}
