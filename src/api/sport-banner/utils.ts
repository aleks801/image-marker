import { responsePropToRegion } from "../region/utils"
import { imageResponseToImage } from "../utils"
import { SportBanner, SportBannerResponse } from "./types"

export const responseToSportBanner = (response: SportBannerResponse): SportBanner[] => {
  return response.data.map((item) => ({
    id: item.id,
    ...item.attributes,
    image: imageResponseToImage(item.attributes.image),
    region: responsePropToRegion(item.attributes.region),
  }))
}
