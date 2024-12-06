const Company = require("../models/companyModel");


exports.getCompanyDetails = async (req, res) => {
  try {
    const companyId = req.user.id; 
    const company = await Company.findById(companyId).populate("jobsPosted");

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Company details fetched successfully",
      company,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const { name, location, email } = req.body;

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Company with this email already exists" });
    }

    const company = new Company({ name, location, email });
    await company.save();

    res.status(201).json({ message: "Company created successfully", company });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


exports.updateCompanyDetails = async (req, res) => {
  try {
    const companyId = req.user.id; 
    const { name, location } = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      { name, location },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Company details updated successfully",
      updatedCompany,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


