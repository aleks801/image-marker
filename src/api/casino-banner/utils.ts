import { responsePropToRegion } from "../region/utils"
import { imageResponseToImage } from "../utils"
import { CasinoBanner, CasinoBannerResponse } from "./types"

export const responseToCasinoBanner = (response: CasinoBannerResponse): CasinoBanner[] => {
  return response.data.map((item) => ({
    id: item.id,
    ...item.attributes,
    image: imageResponseToImage(item.attributes.image),
    region: responsePropToRegion(item.attributes.region),
  }))
}
