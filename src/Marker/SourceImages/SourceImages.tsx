import { useEffect, useState } from "react"
import { toDataUrl } from "./SourceImages.utils"
import styles from "./SourceImages.module.css"

type Props = {
  urls: string[]
  selectedImage?: HTMLImageElement | null
  onLoad: (imgs: HTMLImageElement[]) => void
}

export const SourceImages = ({ urls, onLoad }: Props) => {
  const [images, setImages] = useState<string[]>([])
  const [imagesRefs, setImagesRefs] = useState<HTMLImageElement[]>(new Array(urls.length).fill(null))

  useEffect(() => {
    const getImages = async () => {
      const imgs = await Promise.all(urls.map(toDataUrl))
      setImages(imgs)
    }
    getImages()
  }, [urls])

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
          className={styles.image}
          onLoad={(e) =>
            setImagesRefs((prev) => {
              const newArr = [...prev]
              newArr[index] = e.target as HTMLImageElement
              return newArr
            })
          }
        />
      ))}
    </div>
  )
}
