import { BannerPositioning, Image, ImageResponse, EnumType, EnumTypeResponseProp, StrapiResponse } from "../types"

export type SportBanner = BannerPositioning & {
  id: number
  eventType: EnumType
  sportType: EnumType
  name: string | null
  image: Image
  region: EnumType
}

export type SportBannerResponse = StrapiResponse<
  SportBanner & {
    image: ImageResponse
    region: EnumTypeResponseProp
    eventType: EnumTypeResponseProp
    sportType: EnumTypeResponseProp
  }
>
