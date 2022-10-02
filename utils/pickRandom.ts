export const pickRandom = <T>(array:T[]) => {
  const random = Math.floor(Math.random() * array.length)
  return array[random]
} 