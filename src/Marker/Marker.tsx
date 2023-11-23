import { useState, useRef } from "react"
import { ResultPreview } from "./ResultPreview"
import { SourceImages } from "./SourceImages"
import styles from "./Marker.module.css"
import { Button, Input } from "antd"

type Props = {
  imageUrls: string[]
}

export const Marker = ({ imageUrls }: Props) => {
  console.log({ imageUrls })

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
    <div className={styles.container}>
      {/* <h3>Select image</h3> */}
      <SourceImages urls={imageUrls} onLoad={handleImagesLoad} />
      <div className={styles.fl}>
        <span>Promocode: </span>
        <Input value={promo} onChange={(e) => setPromo(e.target.value)} />
      </div>
      <Button disabled={!loaded} onClick={handleGenerateClick}>
        Generate
      </Button>
      <h3>Result</h3>
      <canvas ref={canvasRef} id="result" className={styles.canvas} />
      <ResultPreview dataURL={dataURL} />
    </div>
  )
}
