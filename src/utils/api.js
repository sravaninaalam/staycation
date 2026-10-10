export async function apiFetch(url, options = {}) {
  const { headers, ...rest } = options
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  })

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`)
  }

  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export function startOfToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}
