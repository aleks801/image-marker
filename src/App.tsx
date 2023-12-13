import { useEffect, useState } from "react"
import { Button, Layout, Select, Spin } from "antd"

import { getRegions } from "./api/enums/regions"
import { EnumType } from "./api/types"
import { getCasinoBanners } from "./api/casino-banner"
import { CasinoBanner } from "./api/casino-banner/types"
import { SportBanner } from "./api/sport-banner/types"
import { getSportBanners } from "./api/sport-banner"
import { bannerToImage } from "./api/utils"
import { getCasinoEventTypes } from "./api/enums/casinoEventTypes"
import { getSportEventTypes } from "./api/enums/sportEventTypes"
import { getSportTypes } from "./api/enums/sportTypes"

import { Marker } from "./Marker"
import styles from "./App.module.css"

export default function App() {
  const [loading, setLoading] = useState(true)

  const [regions, setRegions] = useState<EnumType[]>([])
  const [casinoEventTypes, setCasinoEventTypes] = useState<EnumType[]>([])
  const [sportEventTypes, setSportEventTypes] = useState<EnumType[]>([])
  const [casinoBanners, setCasinoBanners] = useState<CasinoBanner[]>([])
  const [sportBanners, setSportBanners] = useState<SportBanner[]>([])
  const [sportTypes, setSportTypes] = useState<EnumType[]>([])

  const [selectedType, setSelectedType] = useState<"casino" | "sport" | null>()
  const [selectedCasinoEventType, setSelectedCasinoEventType] = useState<EnumType | null>()
  const [selectedSportEventType, setSelectedSportEventType] = useState<EnumType | null>()
  const [selectedSportType, setSelectedSportType] = useState<EnumType | null>()
  const [selectedRegion, setSelectedRegion] = useState<EnumType | null>()

  useEffect(() => {
    const getData = async () => {
      const [_regions, _sportTypes, _sportEventTypes, _casinoEventTypes, _casinoBanners, _sportBanners] = await Promise.all([
        getRegions(),
        getSportTypes(),
        getSportEventTypes(),
        getCasinoEventTypes(),
        getCasinoBanners(),
        getSportBanners(),
      ])
      setRegions(_regions)
      setSportTypes(_sportTypes)
      setCasinoEventTypes(_casinoEventTypes)
      setSportEventTypes(_sportEventTypes)
      setCasinoBanners(_casinoBanners)
      setSportBanners(_sportBanners)
      setLoading(false)
    }
    getData()
  }, [])

  const handleChangeType = (type: "casino" | "sport") => {
    setSelectedType(type)
    setSelectedCasinoEventType(null)
    setSelectedSportEventType(null)
    setSelectedSportType(null)
    setSelectedRegion(null)
  }

  let banners = []
  if (selectedType === "casino") {
    banners = casinoBanners
    if (selectedCasinoEventType) {
      banners = banners.filter((casinoBanner) => casinoBanner.eventType?.id === selectedCasinoEventType.id)
    }
  } else {
    banners = sportBanners
    if (selectedSportType) {
      console.log(selectedSportType, banners)

      banners = banners.filter((sportBanner) => sportBanner.sportType?.id === selectedSportType.id)
      console.log(banners)
    }
    if (selectedSportEventType) {
      banners = banners.filter((sportBanner) => sportBanner.eventType?.id === selectedSportEventType.id)
    }
  }
  if (selectedRegion) {
    banners = banners.filter((casinoBanner) => casinoBanner.region?.id === selectedRegion.id)
  }

  const imagesWithAttrs = banners.map(bannerToImage)
  const showImages = true // selectedType && (selectedCasinoEventType || (selectedSportType && selectedSportEventType)) && selectedRegion
  console.log({
    casinoBanners,
    sportBanners,
    imagesWithAttrs,
    selectedSportEventType,
    selectedSportType,
    selectedRegion,
    selectedCasinoEventType,
  })

  return (
    <div className="App">
      <Layout>
        <Layout.Header>Promo creator</Layout.Header>
        <Layout.Content className={styles.content}>
          {loading && <Spin />}
          {!loading && (
            <>
              <div className={styles.buttonGroup}>
                <Button type={selectedType === "sport" ? "primary" : "default"} onClick={() => handleChangeType("sport")}>
                  Sport
                </Button>
                <Button type={selectedType === "casino" ? "primary" : "default"} onClick={() => handleChangeType("casino")}>
                  Casino
                </Button>
              </div>
              <div className={styles.filters}>
                {selectedType === "sport" && (
                  <div className={styles.buttonGroup}>
                    {sportTypes.map((sportType) => (
                      <Button
                        type={selectedSportType?.id === sportType.id ? "primary" : "default"}
                        onClick={() => setSelectedSportType(sportType)}
                      >
                        {sportType.name}
                      </Button>
                    ))}
                  </div>
                )}
                {selectedType === "sport" && selectedSportType && (
                  <div className={styles.buttonGroup}>
                    {sportEventTypes.map((sportEventType) => (
                      <Button
                        type={selectedSportEventType?.id === sportEventType.id ? "primary" : "default"}
                        onClick={() => setSelectedSportEventType(sportEventType)}
                      >
                        {sportEventType.name}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedType === "casino" && (
                  <div className={styles.buttonGroup}>
                    {casinoEventTypes.map((casinoEventType) => (
                      <Button
                        type={selectedCasinoEventType?.id === casinoEventType.id ? "primary" : "default"}
                        onClick={() => setSelectedCasinoEventType(casinoEventType)}
                      >
                        {casinoEventType.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              {selectedType && (selectedCasinoEventType || (selectedSportType && selectedSportEventType)) && (
                <Select
                  placeholder="Select region"
                  onChange={(region) => setSelectedRegion(regions.find((r) => r.id === region))}
                  options={regions.map((r) => ({ value: r.id, label: r.name }))}
                ></Select>
              )}
              {imagesWithAttrs.length > 10 ? <>More than 10</> : <Marker banners={imagesWithAttrs} />}
            </>
          )}
        </Layout.Content>
      </Layout>
    </div>
  )
}
