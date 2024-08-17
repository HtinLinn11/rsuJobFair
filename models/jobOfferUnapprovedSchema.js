const mongoose = require('mongoose');
const CounterJobOffer = require('./counters/counterJobOfferUnapprovedSchema.js'); // Adjust the path if necessary

const facultyEnum = [
    'RSU_INTERNATIONAL_COLLEGE',             // วิทยาลัยนานาชาติ / Rangsit University International College
    'INTERNATIONAL_CHINESE_COLLEGE',         // วิทยาลัยนานาชาติจีน / International Chinese College
    'COLLEGE_OF_LIBERAL_ARTS',               // วิทยาลัยศิลปศาสตร์ / College of Liberal Arts
    'COLLEGE_OF_DIGITAL_INNOVATION_TECH',    // วิทยาลัยนวัตกรรมดิจิทัลเทคโนโลยี / College of Digital Innovation Technology
    'FACULTY_OF_BUSINESS_ADMINISTRATION',    // คณะบริหารธุรกิจ / Faculty of Business Administration
    'COLLEGE_OF_COMMUNICATION_ARTS',         // หลักสูตรนิเทศศาสตร์(นานาชาติ) วิทยาลัยนิเทศศาสตร์ / College of Communication Arts
    'RSU_ENGLISH_LANGUAGE_INSTITUTE',        // สถาบันภาษาอังกฤษ มหาวิทยาลัยรังสิต / Rangsit English Language Institute
    'CHINESE_THAI_INSTITUTE',                // สถาบันไทย-จีน / Chinese – Thai Institute of Rangsit University
    'RSU_INTERNATIONAL_OFFICE',              // สำนักงานนานาชาติ / Rangsit International Office
    'PERSONNEL_DEVELOPMENT_OFFICE',          // สำนักงานพัฒนาบุคคล มหาวิทยาลัยรังสิต / Personnel Development Office
    'OFFICE_OF_ALUMNI_AND_COMMUNITY_RELATIONS' // สำนักงานศิษย์เก่าและชุมชนสัมพันธ์ / Office of Alumni and Community Relations
  ];

const JobOfferUnapprovedSchema = new mongoose.Schema({
    jobOfferId: {
        type: Number,
        unique: true,
        required: false // Optional, as it will be auto-generated
    },
    companyId: {
        type: Number,
        ref: 'User', // Assuming 'User' is the model name for users
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: false,
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship'],
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending' // Default status is pending
    },
    additionalInfos: {
        type: String,
        required: false
    }
}, 
{ 
    timestamps: true
});

// Pre-save middleware to set auto-incremented jobOfferId
JobOfferUnapprovedSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await CounterJobOffer.findOneAndUpdate(
            { modelName: 'JobOffer' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        this.jobOfferId = counter.sequence_value;
    }
    next();
});

const JobOffer = mongoose.model('JobOfferUnapproved', JobOfferUnapprovedSchema);
module.exports = JobOffer;
