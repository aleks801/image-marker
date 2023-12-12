import React, { useEffect, useRef, useState } from "react"
import { Button } from "antd"
import { downloadImage } from "./ResultPreview.utils"
import styles from "./ResultPreview.module.css"

type Props = {
  promo: string
  name: string
  image: HTMLImageElement
}

const ResultPreviewRaw = ({ promo, name, image }: Props) => {
  const [dataURL, setDataURL] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const canvas = canvasRef.current
  const ctx = canvas?.getContext("2d")

  useEffect(() => {
    if (!canvas || !ctx || !image) {
      return
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const imageObj = image
    const width = imageObj.naturalWidth
    const height = imageObj.naturalHeight

    canvas.height = height
    canvas.width = width
    ctx.drawImage(imageObj, 0, 0, width, height)
    ctx.font = `bold ${Math.round(height * 0.08)}pt Montserrat`
    ctx.fillStyle = "#fff"
    ctx.textAlign = "start"

    const textWidth = ctx.measureText(promo).width
    const x = width - Math.round(width * 0.29) - textWidth / 2
    const y = height - height * 0.14
    ctx.fillText(promo, x, y)

    setDataURL(canvas.toDataURL())
  }, [promo, image])

  const handleDownload = () => {
    if (dataURL) {
      downloadImage(dataURL, name + ".jpeg")
    }
  }

  return (
    <div className={styles.root}>
      <canvas ref={canvasRef} id="result" className={styles.canvas} />
      <img src={dataURL} />
      <Button onClick={handleDownload} disabled={!dataURL}>
        Download
      </Button>
    </div>
  )
}

export const ResultPreview = React.memo(ResultPreviewRaw)
