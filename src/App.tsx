import { Marker } from "./Marker"

const banner1 = "https://i.imgur.com/SteKs2I.png"
const banner2 = "https://i.imgur.com/mtbl1cr.jpeg"
const banners = [banner1, banner2]

export default function App() {
  return (
    <div className="App">
      <h1>Promo banner creator</h1>
      <Marker imageUrls={banners} />
    </div>
  )
}
