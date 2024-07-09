// A mock function to mimic making an async request for data
export const postBlog = async (amount = 1) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Charset: "UTF-8",
    },
    body: JSON.stringify(""),
  })
  const result: { data: number } = await response.json()

  return result
}
