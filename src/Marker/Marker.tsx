import { useState, useRef } from "react"
import { ResultPreview } from "./ResultPreview"
import { SourceImages } from "./SourceImages"
import styles from "./Marker.module.css"

type Props = {
  imageUrls: string[]
}

export const Marker = ({ imageUrls }: Props) => {
  const [loaded, setLoaded] = useState(false)
  const [dataURL, setDataURL] = useState("")
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null)
  const [promo, setPromo] = useState("PROMOCODE")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const canvas = canvasRef.current
  const ctx = canvas?.getContext("2d")

  const handleImageClick = (image: HTMLImageElement) => {
    setSelectedImage(image)
  }

  const handleImagesLoad = () => {
    setLoaded(true)
  }

  const handleGenerateClick = () => {
    if (!canvas || !ctx || !selectedImage) {
      return
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(selectedImage, 0, 0)
    ctx.font = "25pt Calibri"
    ctx.fillText(promo, 10, 100)
    setDataURL(canvas.toDataURL())
  }

  return (
    <div>
      <h3>Select image</h3>
      <SourceImages urls={imageUrls} selectedImage={selectedImage} onSelect={handleImageClick} onLoad={handleImagesLoad} />
      <h3>Write promocode</h3>
      <input value={promo} onChange={(e) => setPromo(e.target.value)} />
      <button disabled={!selectedImage || !loaded} onClick={handleGenerateClick}>
        Generate
      </button>
      <h3>Result</h3>
      <canvas ref={canvasRef} id="result" className={styles.canvas} />
      <ResultPreview dataURL={dataURL} />
    </div>
  )
}
