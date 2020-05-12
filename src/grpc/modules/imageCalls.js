export const uploadImageHandler = async (client, RequestClass, { image }) => {
  const request = new RequestClass()
  request.setContent(image)
  const result = await new Promise((resolve, reject) =>
    client.uploadImage(request, null, (err, response) =>
      err ? reject(err) : resolve(response),
    ),
  )
  return result.toObject().uid
}
