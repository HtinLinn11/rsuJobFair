const mongoose = require('mongoose');
const Counter = require('./counters/counterApplicationSchema'); // Adjust path if necessary

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

const ApplicationSchema = new mongoose.Schema({
    applicationId: {
        type: Number,
        unique: true,
        required: false
    },
    jobOfferId: {
        type: Number, // Use Number if using incremental IDs
        required: true
    },
    studentId: {
        type: Number, // Use Number if using incremental IDs
        required: true
    },
    resumeURL: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true,
        enum: facultyEnum,
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending' // Default status is pending
    }
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save middleware to set auto-incremented applicationId
ApplicationSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { modelName: 'Application' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        this.applicationId = counter.sequence_value;
    }
    next();
});

const Application = mongoose.model('Application', ApplicationSchema);
module.exports = Application;
