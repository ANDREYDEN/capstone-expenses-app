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
export const createNewExpenseSheet = () => {
  return api.post("/sheets/new")
}
export const retrieveExpenseSheet = () => {
  return api.get("/sheets")
}
export const authentificate = () => {
  return api.get("/authentificate")
}
export const getSheetById = (id) => {
  return api.get(`/sheets/${id}`)
}

const apis = {
	login,
	signup,
  createNewExpenseSheet,
  retrieveExpenseSheet
}

export default apis
