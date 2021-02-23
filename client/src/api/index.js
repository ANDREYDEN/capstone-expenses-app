import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const login = (username, password) => {
	return api.post("/login", { username, password })
}
export const signup = (username, password) => {
	return api.post("/signup", { username, password })
}

const apis = {
	login,
	signup
}

export default apis
