const mongoose = require('mongoose');
const CounterUser = require('./counters/counterUserSchema'); // Adjust the path if necessary

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

const UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
        required: false // Optional, as it will be auto-generated
    },
    userType: {
        type: String,
        enum: ['admin', 'student', 'company', 'ajarn'],
        required: true
    },
    username: {
        type: String,
        unique: false,
        required: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    faculty: {
        type: String,
        required: true,
        enum: facultyEnum
    },
    studentId: {
        type: String,
        required: false
    }
}, 
{ 
    timestamps: true
});

// Pre-save middleware to set auto-incremented userId
UserSchema.pre('save', async function(next) {
    if (this.isNew) {
        const counter = await CounterUser.findOneAndUpdate(
            { modelName: 'User' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        this.userId = counter.sequence_value;
    }
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
