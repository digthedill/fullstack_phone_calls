const formatToDatabase = (str) => {
  let dbFormat = str.replace(/[^0-9]/gi, "")
  return "+".concat(dbFormat)
}

const formatFromDatabase = (str) => {
  let formatFrontend = str.substring(2)
  let first = "(" + formatFrontend.slice(0, 3) + ")"
  let second = formatFrontend.slice(3, 6)
  let third = formatFrontend.slice(6)
  return `${first} ${second}-${third}`
}

export { formatFromDatabase, formatToDatabase }
