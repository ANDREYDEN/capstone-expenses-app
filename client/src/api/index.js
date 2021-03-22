import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true
})

export const login = (email, password) => {
	return api.post("/login", { email, password })
}
export const signup = (email, username, password ) => {
	return api.post("/signup", { username, password, email })
}
export const oauth = (tokenId, platform) => {
  return api.post("/oauth", JSON.stringify({ tokenId , platform }))
}
export const createNewExpenseSheet = (groupId) => {
  return api.post("/sheets/new", JSON.stringify({ groupId })) 
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
export const createGroup = (groupName) => {
  return api.post(`/groups/new/`, JSON.stringify({ name: groupName }))
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
