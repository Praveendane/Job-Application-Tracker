import { useState, useEffect } from "react";
import "./styles/app.css";
import {
  addApplication,
  getApplications,
  deleteApplication,
  updateApplicationStatus,
} from "./services/applicationServices";

function App() {
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Applied");
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All")

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      const response = await getApplications();
      console.log("API Response", response.data)
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // handle deleting Applications
  const handleDelete = async (id)=>{
    try{
      await deleteApplication(id);
      alert("application deleted successfully")
      fetchApplications();
    }catch(error){
      console.error(error);
    }
  };
  //Handle Update Status
  const handleStatusChange = async (id, newStatus)=>{
    try{
      await updateApplicationStatus(id, newStatus);
      fetchApplications();
    }catch(error){
      console.error(error);
    }
  }
  // Add application
  const handleSubmit = async () => {
    try {
      const applicationData = {
        companyName,
        jobRole,
        location,
        status,
      };

      const response = await addApplication(applicationData);

      console.log("Saved:", response.data);

      alert("Application Added Successfully!");

      // Clear form
      setCompanyName("");
      setJobRole("");
      setLocation("");
      setStatus("Applied");

      // Refresh applications list
      fetchApplications();
    } catch (error) {
      console.error(error);
      alert("Error Saving Application");
    }
  };

  // Load applications when page opens
  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app)=>{

    const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "All" || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>

      <div className="dashboard">
        <div className="card">
          <h2>{applications.length}</h2>
          <p>Total Applications</p>
        </div>

        <div className="card">
          <h2>
            {applications.filter((app) => app.status === "Applied").length}
          </h2>
          <p>Applied</p>
        </div>

        <div className="card">
          <h2>
            {applications.filter((app) => app.status === "Interview").length}
          </h2>
          <p>Interview</p>
        </div>

        <div className="card">
          <h2>
            {applications.filter((app) => app.status === "Rejected").length}
          </h2>
          <p>Rejected</p>
        </div>

        <div className="card">
          <h2>
            {applications.filter((app) => app.status === "Selected").length}
          </h2>
          <p>Selected</p>
        </div>
      </div>

      <div className="form-container">
        <h2>Add Application</h2>

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Job Role"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Selected</option>
        </select>
       

        <button onClick={handleSubmit}>Add Application</button>
      </div>

      <div className="applications-list">
        <h2>Applications</h2>
        <input type="text" 
        placeholder="Search company..." 
        value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
        <select value={filterStatus} onChange={(e)=> setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Selected">Selected</option>
        </select>

        {filteredApplications.length === 0 ? (
          <p>No Applications Found</p>
        ) : (
          filteredApplications.map((app) => (
            <div key={app._id} className="card">
              <h3>{app.companyName}</h3>
              <p>Role: {app.jobRole}</p>
              <p>Location: {app.location}</p>
              <select value={app.status} onChange={(e)=> handleStatusChange(app._id, e.target.value)}>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Selected">Selected</option>
              </select>
              <button onClick = {()=> handleDelete(app._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;