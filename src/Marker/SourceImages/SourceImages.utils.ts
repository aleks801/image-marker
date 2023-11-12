export function toDataUrl(url: string): Promise<string> {
  return new Promise((res) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const reader = new FileReader()
      reader.onloadend = function () {
        res(reader.result?.toString() || "")
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.open("GET", url)
    xhr.responseType = "blob"
    xhr.send()
  })
}