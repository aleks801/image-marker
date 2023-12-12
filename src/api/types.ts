export type StrapiResponseItem<T> = {
  id: number
  attributes: Omit<T, "id">
}

export type StrapiResponse<T> = {
  data: Array<StrapiResponseItem<T>>
}

export type Image = {
  id: number
  name: string
  width: number
  height: number
  hash: string
  ext: string
  mime: string
  url: string
}

export type ImageResponse = {
  data: StrapiResponseItem<Image>
}

export type EnumType = {
  id: number
  name: string
}

export type EnumTypeResponseProp = {
  data: StrapiResponseItem<EnumType>
}

export type EnumTypeResponseObj = StrapiResponse<EnumType>

export type BannerPositioning = {
  orientation: "vertical" | "horizontal"
  promoCodePosition: "bottomCenter" | "bottomRight"
  promoCodeWithAngle: boolean
}

export type ImageWithPosition = BannerPositioning & Image