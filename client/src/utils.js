/**
 * Finds how one object is different from the other.
 *
 * @param obj1 {Object}
 * @param obj2 {Object}
 *
 * @return {Object} Returns the newly created object that has the fields that present in object one and 2 but different and that are .
 */
export function differ(obj1, obj2) {
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  const diffFields = obj1Keys.map(key => {
    if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
      return [key, obj2[key]]
    }
    return []
  })
  const newFields = obj2Keys.map(key => {
    return obj1[key] === undefined ? [key, obj2[key]] : []
  })
  return diffFields.concat(newFields).reduce((obj, [key, value]) => {
    if (key && value !== undefined) {
      obj[key] = value
    }
    return obj
  }, {})
}

/**
 * Finds how one object is different from the other. Does deep comparison
 *
 * @param obj1 {Object}
 * @param obj2 {Object}
 *
 * @return {Object} Returns the newly created object that has the fields that present in object one and 2 but different and that are .
 */
export function differDeep(obj1, obj2) {
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)

  const diffFields = obj1Keys.map(key => {
    const obj = obj1[key]
    if (obj instanceof Object) {
      // NOTE: this will recursively compare each field in each child object
      const diff = differDeep(obj1[key], obj2[key])
      return Object.keys(diff).length ? [key, diff] : []
    }
    if (obj1[key] !== obj2[key]) {
      return [key, obj2[key]]
    }
    return []
  })
  const newFields = obj2Keys.map(key => {
    return obj1[key] === undefined ? [key, obj2[key]] : []
  })
  return diffFields.concat(newFields).reduce((obj, [key, value]) => {
    if (key && value !== undefined) {
      obj[key] = value
    }
    return obj
  }, {})
}

export function debounce(func, wait) {
  let timeout
  return (...args) => {
    const later = () => {
      timeout = null
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default {
  differ,
  debounce,
  differDeep
}