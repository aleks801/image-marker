import { useState, useRef, useEffect } from "react"
import { ResultPreview } from "./ResultPreview"
import { SourceImages } from "./SourceImages"
import styles from "./Marker.module.css"
import { Button, Input } from "antd"
import { ImageWithPosition } from "../api/types"

type Props = {
  banners: ImageWithPosition[]
}

export const Marker = ({ banners }: Props) => {
  console.log(banners)

  const [loaded, setLoaded] = useState(false)
  const [dataURL, setDataURL] = useState("")
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [promo, setPromo] = useState("PROMOCODE")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const canvas = canvasRef.current
  const ctx = canvas?.getContext("2d")

  const handleImageClick = (image: HTMLImageElement) => {
    setSelectedImage(image)
  }

  const handleImagesLoad = (imgs: HTMLImageElement[]) => {
    setImages(imgs)
    setLoaded(true)
  }

  const handleGenerateClick = () => {
    if (!canvas || !ctx || !images.length) {
      return
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    console.log({ images })

    const imageObj = images[0]
    canvas.height = imageObj.height
    canvas.width = imageObj.width
    ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height)
    ctx.font = "bold 16pt Montserrat"
    ctx.fillStyle = "#fff"
    ctx.textAlign = "start"
    ctx.fillText(promo, imageObj.height - 28, imageObj.width - 178)
    setDataURL(canvas.toDataURL())
  }

  useEffect(() => {
    if (!ctx || !canvas || !images.length) {
      return
    }

    const imageObj = images[0]
    // let imgWidth = imageObj.naturalWidth
    // const screenWidth = canvas.width
    // let scaleX = 1
    // if (imgWidth > screenWidth) scaleX = screenWidth / imgWidth
    // let imgHeight = imageObj.naturalHeight
    // const screenHeight = canvas.height
    // let scaleY = 1
    // if (imgHeight > screenHeight) scaleY = screenHeight / imgHeight
    // let scale = scaleY
    // if (scaleX < scaleY) scale = scaleX
    // if (scale < 1) {
    //   imgHeight = imgHeight * scale
    //   imgWidth = imgWidth * scale
    // }

    canvas.height = imageObj.height
    canvas.width = imageObj.width
    // ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height)
  }, [ctx, images, canvas])

  return (
    <div className={styles.container}>
      {/* <h3>Select image</h3> */}
      <SourceImages urls={banners.map((b) => b.url)} onLoad={handleImagesLoad} />
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
