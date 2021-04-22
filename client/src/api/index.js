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
export const createNewExpenseSheet = (groupId, sheet) => {
  return api.post("/sheets/new", JSON.stringify({ groupId, sheet })) 
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
export const addNewEntry = (sheetId, entry) => {
  return api.post(`/sheets/addEntry/${sheetId}`, JSON.stringify(entry))
}
// NOTE: Depricated. Use updateEntries instead
export const updateEntry = (sheetId, index, entry) => {
  return api.post(`/sheets/updateEntry/${sheetId}`, JSON.stringify({ index, entry }))
}
// NOTE: entries: Array<{ index, update }>
export const updateEntries = (sheetId, entries) => {
  return api.post(`/sheets/updateEntries/${sheetId}`, JSON.stringify({ entries }))
}
export const deleteEntry = (sheetId, entry) => {
  return api.delete(`/sheets/deleteEntry/${sheetId}/${entry.id}`)
}
// GROUPS
export const getGroupMembers = (id) => {
  return api.get(`/groups/${id}/members`)
}
export const getGroup = (id) => {
  return api.get(`/groups/${id}`)
}
export const createGroup = (groupName) => {
  return api.post(`/groups/new/`, JSON.stringify({ name: groupName }))
}
export const getGroups = () => {
  return api.get(`/groups/`)
}
export const getGroupInviteLink = (groupId) => {
  return api.get(`/groups/${groupId}/invite`)
}
export const joinGroup = (groupId) => {
  return api.post(`/groups/${groupId}/join/`)
}
// BALANCES
export const payExpenseSheets = (sheetsToPay) =>{
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
  getGroup,
  getGroupMembers,
  createGroup,
  getGroups,
  payExpenseSheets,
  joinGroup,
  updateEntries,
  deleteEntry,
  getGroupInviteLink
}

export default apis
