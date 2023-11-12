import React from "react"
import { downloadImage } from "./ResultPreview.utils"
import styles from "./ResultPreview.module.css"

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
      <button onClick={handleDownload} disabled={!dataURL}>
        Download
      </button>
    </div>
  )
}

export const ResultPreview = React.memo(ResultPreviewRaw)
