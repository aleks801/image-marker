import { Button, Layout, Select, Spin } from "antd"
import { Marker } from "./Marker"
import { useEffect, useState } from "react"
import { getRegions } from "./api/region"
import { Region } from "./api/types"
import { getCasinoBanners } from "./api/casino-banner"
import { CasinoBanner } from "./api/casino-banner/types"
import { host } from "./api/const"

import styles from "./App.module.css"

const banner1 = "https://i.imgur.com/SteKs2I.png"
const banner2 = "https://i.imgur.com/mtbl1cr.jpeg"
const banners = [banner1, banner2]

export default function App() {
  const [loading, setLoading] = useState(true)

  const [regions, setRegions] = useState<Region[]>([])
  const [casinoBanners, setCasinoBanners] = useState<CasinoBanner[]>([])
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
      const [_regions, _casinoBanners] = await Promise.all([getRegions(), getCasinoBanners()])
      setRegions(_regions)
      setCasinoBanners(_casinoBanners)
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
              {selectedType && (selectedCasinoEventType || (selectedSportType && selectedSportEventType)) && selectedRegion && (
                <Marker imageUrls={casinoBanners.map((cb) => host + cb.image.url)} />
              )}
            </>
          )}
        </Layout.Content>
      </Layout>
    </div>
  )
}
