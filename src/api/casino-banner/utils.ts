import { imageResponseToImage, responseEnumTypePropToEnumType } from "../utils"
import { CasinoBanner, CasinoBannerResponse } from "./types"

export const responseToCasinoBanner = (response: CasinoBannerResponse): CasinoBanner[] => {
  return response.data.map((item) => ({
    id: item.id,
    ...item.attributes,
    image: imageResponseToImage(item.attributes.image),
    region: responseEnumTypePropToEnumType(item.attributes.region),
    eventType: responseEnumTypePropToEnumType(item.attributes.eventType),
  }))
}
