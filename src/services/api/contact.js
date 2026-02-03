import api from "./client"

export const getContact = (params) => 
    api.get("/contacts", {params}).then((r) => r.data.data)

export const getContactById = (id) =>
    api.get(`/contacts/${id}`).then((r) => r.data.data)

export const createContact = (payload) =>
    api.post("/contacts", payload).then((r) => r.data.data)

export const updateContact = (id, payload) =>
    api.put(`/contacts/${id}`, payload).then((r) => r.data.data)

export const deleteContact = (id) =>
    api.delete(`/contacts/${id}`).then((r) => r.data.data)