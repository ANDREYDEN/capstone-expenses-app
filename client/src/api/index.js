import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true
})

// AUTHENTIFICATION
export const login = (email, password) => {
	return api.post("/login", { email, password })
}
export const signup = (email, username, password ) => {
	return api.post("/signup", { username, password, email })
}
export const oauth = (tokenId, platform) => {
  return api.post("/oauth", JSON.stringify({ tokenId , platform }))
}
export const authentificate = () => {
  return api.get("/authentificate")
}
// EXPENSE SHEETS
export const createNewExpenseSheet = (groupId) => {
  return api.post("/sheets/new", JSON.stringify({ groupId })) 
}
export const retrieveExpenseSheets = (groupId) => {
  return api.get(`/sheets?groupId=${groupId}`)
}
export const getSheetById = (id) => {
  return api.get(`/sheets/${id}`)
}
export const updateSheet = (id, update) => {
  return api.post(`/sheets/update/${id}`, JSON.stringify(update))
}
export const addNewEntry = (sheetId) => {
  return api.post(`/sheets/addEntry/${sheetId}`)
}
export const updateEntry = (sheetId, index, entry) => {
  return api.post(`/sheets/updateEntry/${sheetId}`, JSON.stringify({ index, entry }))
}
// GROUPS
export const getGroupMembers = (id) => {
  return api.get(`/groups/${id}`)
}
export const createGroup = (groupName) => {
  return api.post(`/groups/new/`, JSON.stringify({ name: groupName }))
}
export const getGroups = () => {
  return api.get(`/groups/`)
}
// BALANCES
export const payExpenseSheets =(sheetsToPay) =>{
  return api.post(`/pay/sheets`, JSON.stringify(sheetsToPay))
}

const apis = {
  login,
  signup,
  oauth,
  authentificate,
  createNewExpenseSheet,
  retrieveExpenseSheets,
  getSheetById,
  updateSheet,
  addNewEntry,
  updateEntry,
  getGroupMembers,
  createGroup,
  getGroups,
  payExpenseSheets
}

export default apis
