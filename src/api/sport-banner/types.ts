import { BannerPositioning, Image, ImageResponse, Region, RegionResponseProp, StrapiResponse } from "../types"

export type SportBanner = BannerPositioning & {
  id: number
  eventType: "general" | "events"
  sportType: string
  name: string | null
  image: Image
  region: Region
}

export type SportBannerResponse = StrapiResponse<
  SportBanner & {
    image: ImageResponse
    region: RegionResponseProp
  }
>
