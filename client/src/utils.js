/**
 * Finds how one object is different from the other.
 *
 * @param obj1 {Object}
 * @param obj2 {Object}
 *
 * @return {Object} Returns the newly created object that has the fields that present in object one and 2 but different and that are .
 */
function differ(obj1, obj2) {
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  const diffFields = obj1Keys.map(key => {
    if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
      return [key, obj2[key]];
    }
    return []
  })
  const newFields = obj2Keys.map(key => {
    return !obj1[key] ? [key, obj2[key]] : []
  })
  return diffFields.concat(newFields).reduce((obj, [key, value]) => {
    if (key && value) {
      obj[key] = value
    }
    return obj
  }, {})
}

export default {
  differ
}