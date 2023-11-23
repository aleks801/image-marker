import { Image, ImageResponse, Region, RegionResponseProp, StrapiResponse } from "../types"

export type CasinoBanner = {
  id: number
  eventType: "general" | "aviator"
  orientation: "vertical" | "horizontal"
  promoCodePosition: "bottomCenter" | "bottomRight"
  promoCodeWithAngle: boolean
  name: string | null
  image: Image
  region: Region
}

export type CasinoBannerResponse = StrapiResponse<
  CasinoBanner & {
    image: ImageResponse
    region: RegionResponseProp
  }
>
