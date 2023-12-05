import React, { useEffect, useState } from "react"
import classNames from "classnames"
import { toDataUrl } from "./SourceImages.utils"
import styles from "./SourceImages.module.css"

type Props = {
  urls: string[]
  selectedImage?: HTMLImageElement | null
  // onSelect: (image: HTMLImageElement) => void
  onLoad: (imgs: HTMLImageElement[]) => void
}

const SourceImagesRaw = ({ urls, selectedImage, onLoad }: Props) => {
  const [images, setImages] = useState<string[]>([])
  const [imagesRefs, setImagesRefs] = useState<HTMLImageElement[]>(new Array(urls.length).fill(null))

  useEffect(() => {
    const getImages = async () => {
      const imgs = await Promise.all(urls.map(toDataUrl))
      console.log(imgs)

      setImages(imgs)
    }
    getImages()
  }, [])

  useEffect(() => {
    if (imagesRefs.filter((e) => e).length === urls.length) {
      onLoad(imagesRefs)
    }
  }, [imagesRefs, onLoad, urls.length])

  return (
    <div className={styles.root}>
      {images.map((src: string, index) => (
        <img
          crossOrigin="anonymous"
          src={src}
          height={200}
          className={classNames(styles.image, { [styles.active]: selectedImage?.src === src })}
          onLoad={(e) =>
            setImagesRefs((prev) => {
              const newArr = [...prev]
              newArr[index] = e.target as HTMLImageElement
              return newArr
            })
          }
          // onClick={(e) => onSelect(e.target as HTMLImageElement)}
        />
      ))}
    </div>
  )
}

export const SourceImages = React.memo(SourceImagesRaw)
