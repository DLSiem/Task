"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    items: [
        {
            title: {
                type: String,
                required: true
            },
            done: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    creator: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    }
}, {
    timestamps: true
});
const Task = mongoose_1.default.model('Task', taskSchema);
exports.default = Task;
//# sourceMappingURL=Task.js.map