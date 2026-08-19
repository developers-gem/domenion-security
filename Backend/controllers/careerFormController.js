

const CareerForm = require("../models/CareerForm");

// Create a new career form submission
const createCareerForm = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;
    if(!fullName || !email || !phone) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }
    const CareerFormSubmission = await CareerForm.create({ fullName, email, phone, message });
    res.status(201).json({ success: true, data: CareerFormSubmission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


const deleteCareerForm = async(req,res)=>{
    try {
        const careerForm = await CareerForm.findById(req.params.id);
        if(!careerForm){
            return res.status(404).json({success:false,message:"Career form submission not found"});
        }
        careerForm = await  CareerForm.findByIdAndDelete(req.params.id)
        if(careerForm){
            return res.status(200).json({success:true,message:"Career form submission deleted successfully"});
        }

    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }

        
}


module.exports = {createCareerForm,deleteCareerForm}
