export default function randInt(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min))
}
