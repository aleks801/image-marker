import React from "react"
import { downloadImage } from "./ResultPreview.utils"
import styles from "./ResultPreview.module.css"
import { Button } from "antd"

type Props = {
  dataURL?: string
}

const ResultPreviewRaw = ({ dataURL }: Props) => {
  const handleDownload = () => {
    if (dataURL) {
      downloadImage(dataURL, "my-canvas.jpeg")
    }
  }

  return (
    <div className={styles.root}>
      <img src={dataURL} />
      <Button onClick={handleDownload} disabled={!dataURL}>
        Download
      </Button>
    </div>
  )
}

export const ResultPreview = React.memo(ResultPreviewRaw)
