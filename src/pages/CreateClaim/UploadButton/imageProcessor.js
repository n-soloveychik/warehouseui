const getBase64 = async (file) =>
  new Promise((resolve) => {
    var reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.readAsDataURL(file)
  })

function compressImage(base64) {
  const canvas = document.createElement('canvas')
  const img = document.createElement('img')

  return new Promise((resolve, reject) => {
    img.onload = function () {
      let width = img.width
      let height = img.height
      const maxHeight = 900
      const maxWidth = 900

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height *= maxWidth / width))
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width *= maxHeight / height))
          height = maxHeight
        }
      }
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      resolve(canvas.toDataURL('image/jpeg', 0.7))
    }
    img.onerror = function (err) {
      reject(err)
    }
    img.src = base64
  })
}

let BASE64_MARKER = ';base64,'
function convertDataURIToBinaryFF(dataURI) {
  let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
  let raw = window.atob(dataURI.substring(base64Index))
  return Uint8Array.from(
    Array.prototype.map.call(raw, function (x) {
      return x.charCodeAt(0)
    }),
  )
}

export default async (file) => {
  const base64 = await getBase64(file)
  const compressedBase64 = await compressImage(base64)
  const bi = convertDataURIToBinaryFF(compressedBase64)
  return { base64: compressedBase64, binary: bi }
}
