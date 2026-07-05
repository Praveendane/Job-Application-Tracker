import axios from "axios";

const API_URL = "https://job-application-tracker-9uax.onrender.com/api/applications";

export const addApplication = (data) => {
  return axios.post(API_URL, data);
};

export const getApplications = () => {
  return axios.get(API_URL);
};


export const deleteApplication = (id)=>{
  return axios.delete(`${API_URL}/${id}`)
}

export const updateApplicationStatus = (id, status)=>{
  return axios.put(`${API_URL}/${id}`, {status})
}