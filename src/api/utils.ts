import { host } from "./const"
import {
  BannerPositioning,
  EnumType,
  EnumTypeResponseObj,
  EnumTypeResponseProp,
  Image,
  ImageResponse,
  ImageWithPosition,
} from "./types"

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

export const responseEnumTypeObjToEnumType = (response: EnumTypeResponseObj): EnumType[] => {
  return response.data.map((item) => ({ id: item.id, name: item.attributes.name }))
}

export const responseEnumTypePropToEnumType = (response: EnumTypeResponseProp): EnumType | null => {
  if (!response.data) {
    return null
  }
  return { id: response.data.id, name: response.data.attributes.name }
}
