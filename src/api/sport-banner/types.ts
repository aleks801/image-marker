import { BannerPositioning, Image, ImageResponse, EnumType, EnumTypeResponseProp, StrapiResponse } from "../types"

export type SportBanner = BannerPositioning & {
  id: number
  eventType: EnumType | null
  sportType: EnumType | null
  name: string | null
  image: Image
  region: EnumType | null
}

export type SportBannerResponse = StrapiResponse<
  Omit<SportBanner, "image" | "region" | "eventType" | "sportType"> & {
    image: ImageResponse
    region: EnumTypeResponseProp
    eventType: EnumTypeResponseProp
    sportType: EnumTypeResponseProp
  }
>
