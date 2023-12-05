import { host } from "./const"
import { BannerPositioning, Image, ImageResponse, ImageWithPosition } from "./types"

export const imageResponseToImage = (response: ImageResponse): Image => {
  return {
    id: response.data.id,
    ...response.data.attributes,
  }
}

export const bannerToImage = (obj: BannerPositioning & { image: Image }): ImageWithPosition => {
  return {
    ...obj.image,
    ...obj,
    url: host + obj.image.url,
  }
}
