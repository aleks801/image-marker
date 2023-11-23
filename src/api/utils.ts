import { Image, ImageResponse } from "./types"

export const imageResponseToImage = (response: ImageResponse): Image => {
  return {
    id: response.data.id,
    ...response.data.attributes,
  }
}
