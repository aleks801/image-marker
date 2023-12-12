import { imageResponseToImage, responseEnumTypePropToEnumType } from "../utils"
import { SportBanner, SportBannerResponse } from "./types"

export const responseToSportBanner = (response: SportBannerResponse): SportBanner[] => {
  return response.data.map((item) => ({
    id: item.id,
    ...item.attributes,
    image: imageResponseToImage(item.attributes.image),
    region: responseEnumTypePropToEnumType(item.attributes.region),
    eventType: responseEnumTypePropToEnumType(item.attributes.eventType),
    sportType: responseEnumTypePropToEnumType(item.attributes.sportType),
  }))
}
