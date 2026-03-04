const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Quiz title is required'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        subject: {
            type: String,
            required: [true, 'Subject is required'],
            trim: true,
        },
        duration: {
            type: Number,
            required: true,
            default: 30,
        },
        passingScore: {
            type: Number,
            default: 40,
        },
        maxAttempts: {
            type: Number,
            default: 1,
        },
        totalMarks: {
            type: Number,
            default: 0,
        },
        numberOfQuestions: {
            type: Number,
            default: 0,
        },
        quizMode: {
            type: String,
            enum: ['immediate', 'scheduled'],
            default: 'immediate',
        },
        scheduledStart: { type: Date },
        scheduledEnd: { type: Date },
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'medium',
        },
        shuffleQuestions: { type: Boolean, default: false },
        shuffleOptions: { type: Boolean, default: false },
        isPublished: { type: Boolean, default: false },
        isArchived: { type: Boolean, default: false },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        questions: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        ],
        // Assignment
        assignedTo: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        ],
        assignedGroups: [
            {
                department: String,
                semester: Number,
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model('Quiz', quizSchema);
