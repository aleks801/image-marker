import { Region, RegionResponseObj, RegionResponseProp } from "../types"

export const responseObjToRegion = (response: RegionResponseObj): Region[] => {
  return response.data.map((item) => ({ id: item.id, name: item.attributes.name }))
}

export const responsePropToRegion = (response: RegionResponseProp): Region => {
  return { id: response.data.id, name: response.data.attributes.name }
}
