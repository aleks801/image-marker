import { Button, Layout, Select, Spin } from "antd"
import { Marker } from "./Marker"
import { useEffect, useState } from "react"
import { getRegions } from "./api/region"
import { Region } from "./api/types"
import { getCasinoBanners } from "./api/casino-banner"
import { CasinoBanner } from "./api/casino-banner/types"

import styles from "./App.module.css"
import { SportBanner } from "./api/sport-banner/types"
import { getSportBanners } from "./api/sport-banner"
import { bannerToImage } from "./api/utils"

export default function App() {
  const [loading, setLoading] = useState(true)

  const [regions, setRegions] = useState<Region[]>([])
  const [casinoBanners, setCasinoBanners] = useState<CasinoBanner[]>([])
  const [sportBanners, setSportBanners] = useState<SportBanner[]>([])
  const [casinoEvents, setCasinoEvents] = useState<string[]>(["general", "aviator"])
  const [sportEvents, setSportEvents] = useState<string[]>(["general", "events"])
  const [sportTypes, setSportTypes] = useState<string[]>(["football", "cricket"])

  const [selectedType, setSelectedType] = useState<"casino" | "sport" | null>()
  const [selectedCasinoEventType, setSelectedCasinoEventType] = useState<string | null>()
  const [selectedSportEventType, setSelectedSportEventType] = useState<string | null>()
  const [selectedSportType, setSelectedSportType] = useState<string | null>()
  const [selectedRegion, setSelectedRegion] = useState<Region | null>()

  useEffect(() => {
    const getData = async () => {
      const [_regions, _casinoBanners, _sportBanners] = await Promise.all([getRegions(), getCasinoBanners(), getSportBanners()])
      setRegions(_regions)
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

  const banners = (selectedType === "casino" ? casinoBanners : sportBanners).map(bannerToImage)
  const showImages = true // selectedType && (selectedCasinoEventType || (selectedSportType && selectedSportEventType)) && selectedRegion
  console.log({ banners })

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
                        type={selectedSportType === sportType ? "primary" : "default"}
                        onClick={() => setSelectedSportType(sportType)}
                      >
                        {sportType}
                      </Button>
                    ))}
                  </div>
                )}
                {selectedType === "sport" && selectedSportType && (
                  <div className={styles.buttonGroup}>
                    {sportEvents.map((sportEvent) => (
                      <Button
                        type={selectedSportEventType === sportEvent ? "primary" : "default"}
                        onClick={() => setSelectedSportEventType(sportEvent)}
                      >
                        {sportEvent}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedType === "casino" && (
                  <div className={styles.buttonGroup}>
                    {casinoEvents.map((casinoEvent) => (
                      <Button
                        type={selectedCasinoEventType === casinoEvent ? "primary" : "default"}
                        onClick={() => setSelectedCasinoEventType(casinoEvent)}
                      >
                        {casinoEvent}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              {selectedType && (selectedCasinoEventType || (selectedSportType && selectedSportEventType)) && (
                <Select
                  placeholder="Select region"
                  onChange={(region) => setSelectedRegion(region)}
                  options={regions.map((r) => ({ value: r.id, label: r.name }))}
                ></Select>
              )}
              {showImages && <Marker banners={banners} />}
            </>
          )}
        </Layout.Content>
      </Layout>
    </div>
  )
}
