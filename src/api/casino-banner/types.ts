import { BannerPositioning, Image, ImageResponse, EnumType, EnumTypeResponseProp, StrapiResponse } from "../types"

export type CasinoBanner = BannerPositioning & {
  id: number
  eventType: EnumType | null
  name: string | null
  image: Image
  region: EnumType | null
}

export type CasinoBannerResponse = StrapiResponse<
  Omit<CasinoBanner, "image" | "region" | "eventType"> & {
    image: ImageResponse
    region: EnumTypeResponseProp
    eventType: EnumTypeResponseProp
  }
>
