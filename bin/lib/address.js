module.exports.removeGun = (cityName) => {
  let normalized = cityName
  if (normalized.match(/^(.+[郡])(.+[町村].*)$/)) {
      normalized = RegExp.$2
  }
  return normalized
}
