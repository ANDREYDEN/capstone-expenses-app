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
export const oauth = (tokenId, platform) => {
  return api.post("/oauth", JSON.stringify({ tokenId , platform }))
}
export const createNewExpenseSheet = () => {
  return api.post("/sheets/new")
}
export const retrieveExpenseSheets = (groupId) => {
  return api.get(`/sheets?groupId=${groupId}`)
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
export const addNewEntry = (sheetId) => {
  return api.post(`/sheets/addEntry/${sheetId}`)
}
export const updateEntry = (sheetId, index, entry) => {
  return api.post(`/sheets/updateEntry/${sheetId}`, JSON.stringify({ index, entry }))
}



const apis = {
	login,
	signup,
  createNewExpenseSheet,
  retrieveExpenseSheets,
  getSheetById,
  updateSheet,
  getGroupMembers,
  addNewEntry,
  updateEntry
}

export default apis
