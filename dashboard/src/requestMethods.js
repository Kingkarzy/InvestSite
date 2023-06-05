import axios from "axios";


const BASE_URL = 'http/localhost:3001/api/'
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2RkNGUzYmExNzBjZWQyMjFlODQxZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODU5Njg1ODMsImV4cCI6MTY4NjIyNzc4M30.F7EpaHghIxWo-JBmhpr5aLkMmNKb0JPqdVa2WcpwZMg'
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
})
