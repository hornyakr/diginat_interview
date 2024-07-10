// A mock function to mimic making an async request for data
export const postBlog = async ({
  title,
  body,
  userId = 1,
}: {
  title: string
  body: string
  userId?: number
}) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Charset: "UTF-8",
    },
    body: JSON.stringify({
      title: title,
      body: body,
      userId: userId,
    }),
  })
  const result: {
    id: number
    title: string
    body: string
    userId: number
  } = await response.json()

  return result
}
