const Application = require("../models/Application");

// Add Application
const addApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteApplication = async (req, res) =>{
  try{
    const application = await Application.findByIdAndDelete(req.params.id);
    if(!application){
      return res.status(404).json({message: "Application not found"});
    }
    res.json({message:"Application deleted successfully"});
  }catch(error){
    res.status(500).json({message: error.message})
  }
};

const updateApplicationStatus = async (req, res)=>{
  try{
    const application = await Application.findByIdAndUpdate(
      req.params.id,{status: req.body.status}, {new: true}
    );
    if (!application){
      return res.status(404).json({
        message:"Application not found"
      })
    }
    res.json(application);
  }catch (error){
    res.status(500).json({message: error.message,})
  }
}

module.exports = {
  addApplication,
  getApplications,
  deleteApplication,
  updateApplicationStatus,
};