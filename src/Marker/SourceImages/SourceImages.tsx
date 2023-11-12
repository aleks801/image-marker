import React, { useEffect, useState } from "react"
import classNames from "classnames"
import { toDataUrl } from "./SourceImages.utils"
import styles from "./SourceImages.module.css"

type Props = {
  urls: string[]
  selectedImage?: HTMLImageElement | null
  onSelect: (image: HTMLImageElement) => void
  onLoad: () => void
}

const SourceImagesRaw = ({ urls, selectedImage, onSelect, onLoad }: Props) => {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const getImages = async () => {
      const imgs = await Promise.all(urls.map(toDataUrl))
      setImages(imgs)
      onLoad()
    }
    getImages()
  }, [])

  return (
    <div className={styles.root}>
      {images.map((src: string) => (
        <img
          crossOrigin="anonymous"
          src={src}
          height={200}
          className={classNames(styles.image, { [styles.active]: selectedImage?.src === src })}
          onClick={(e) => onSelect(e.target as HTMLImageElement)}
        />
      ))}
    </div>
  )
}

export const SourceImages = React.memo(SourceImagesRaw)
