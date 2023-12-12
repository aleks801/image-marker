import { BannerPositioning, Image, ImageResponse, EnumType, EnumTypeResponseProp, StrapiResponse } from "../types"

export type CasinoBanner = BannerPositioning & {
  id: number
  eventType: EnumType
  name: string | null
  image: Image
  region: EnumType
}

export type CasinoBannerResponse = StrapiResponse<
  CasinoBanner & {
    image: ImageResponse
    region: EnumTypeResponseProp
    eventType: EnumTypeResponseProp
  }
>
