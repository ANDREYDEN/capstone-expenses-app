import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true
})

export const login = (username, password) => {
	return api.post("/login", { username, password })
}
export const signup = (username, password) => {
	return api.post("/signup", { username, password })
}
export const createNewExpenceSheet = () => {
  return api.post("/sheet/new")
}

const apis = {
	login,
	signup,
  createNewExpenceSheet
}

export default apis
