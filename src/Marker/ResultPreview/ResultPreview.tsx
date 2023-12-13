import React, { useEffect, useRef, useState } from "react"
import { Button } from "antd"
import { downloadImage } from "./ResultPreview.utils"
import styles from "./ResultPreview.module.css"
import { ImageWithPosition } from "../../api/types"

type Props = {
  promo: string
  banner?: ImageWithPosition
  image: HTMLImageElement
}

const getTextParams = (banner?: ImageWithPosition) => {
  let fontK = 0.08
  let dx = 0.29
  let dy = 0.14

  if (!banner) {
    return { fontK, dx, dy }
  }

  switch (banner.orientation) {
    case "horizontal":
      fontK = 0.08
      dy = 0.14
      break
    case "vertical":
      fontK = 0.04
      dy = 0.095
      break
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _never: never = banner.orientation
    }
  }

  switch (banner.promoCodePosition) {
    case "bottomCenter":
      dx = 0.5
      break
    case "bottomRight":
      dx = 0.29
      break
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _never: never = banner.promoCodePosition
    }
  }

  switch (banner.promoCodeWithAngle) {
    case true:
      dx += 0.15
      dy -= 0.02
  }

  return { fontK, dx, dy }
}

export const ResultPreview = ({ promo, banner, image }: Props) => {
  const [dataURL, setDataURL] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const canvas = canvasRef.current
  const ctx = canvas?.getContext("2d")
  console.log({ banner })

  useEffect(() => {
    if (!canvas || !ctx || !image) {
      return
    }

    const { fontK, dx, dy } = getTextParams(banner)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const imageObj = image
    const width = imageObj.naturalWidth
    const height = imageObj.naturalHeight

    canvas.height = height
    canvas.width = width
    ctx.drawImage(imageObj, 0, 0, width, height)
    ctx.font = `bold ${Math.round(height * fontK)}pt Montserrat`
    ctx.fillStyle = "#fff"
    ctx.textAlign = "start"

    const textWidth = ctx.measureText(promo).width
    const x = width - Math.round(width * dx) - textWidth / 2
    const y = height - height * dy
    if (banner?.promoCodeWithAngle) {
      ctx.rotate(-Math.PI / 33)
    }
    ctx.fillText(promo, x, y)
    if (banner?.promoCodeWithAngle) {
      ctx.restore()
    }

    setDataURL(canvas.toDataURL())
  }, [promo, image])

  const handleDownload = () => {
    if (dataURL) {
      downloadImage(dataURL, banner?.hash + ".jpeg")
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
