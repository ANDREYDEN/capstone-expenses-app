import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/',
})

export const login = (username, password) => {
	return api.post("/login", { params: { username, password } })
}
export const signup = (username, password) => {
	return api.get("/signup", { params: { username, password } })
}

const apis = {
	login,
	signup
}

export default apis
