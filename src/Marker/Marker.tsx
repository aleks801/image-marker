import { useEffect, useState } from "react"
import { ResultPreview } from "./ResultPreview"
import { SourceImages } from "./SourceImages"
import { Input } from "antd"
import { ImageWithPosition } from "../api/types"
import styles from "./Marker.module.css"

type Props = {
  banners: ImageWithPosition[]
}

export const Marker = ({ banners }: Props) => {
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [promo, setPromo] = useState("PROMOCODE")

  const handleImagesLoad = (imgs: HTMLImageElement[]) => {
    setImages(imgs)
  }

  useEffect(() => {
    setImages([])
  }, [banners])

  return (
    <div className={styles.container}>
      <SourceImages urls={banners.map((b) => b.url)} onLoad={handleImagesLoad} />
      <div className={styles.fl}>
        <span>Promocode: </span>
        <Input value={promo} onChange={(e) => setPromo(e.target.value)} />
      </div>
      <h3>Result</h3>
      <div className={styles.results}>
        {images.map((image, index) => (
          <ResultPreview promo={promo} image={image} banner={banners[index]} />
        ))}
      </div>
    </div>
  )
}
