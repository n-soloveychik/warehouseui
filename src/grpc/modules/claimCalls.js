export async function createClaim(
  client,
  RequestClass,
  { itemId, description, images },
) {
  const request = new RequestClass()
  request.setClaimDescription(description)
  request.setImagesList(images)
  request.setItemId(itemId)
  const result = await new Promise((resolve) => {
    client.setItemStatusClaim(request, null, (err, response) =>
      resolve(response),
    )
  })
  return result
}
