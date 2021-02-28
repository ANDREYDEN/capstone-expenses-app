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
export const updateSheet = (id, update) => {
  return api.post(`/sheets/update/${id}`, JSON.stringify(update))
}
export const getGroupMembers = (id) => {
  return api.get(`/groups/${id}`)
}
export const addNewEntry = (id) => {
  return api.post(`/sheets/addEntry/${id}`)
}


const apis = {
	login,
	signup,
  createNewExpenseSheet,
  retrieveExpenseSheet,
  getSheetById,
  updateSheet,
  getGroupMembers
}

export default apis
