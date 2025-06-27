var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Note from "../models/noteModel.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import PendingDeletion from "../models/pendingDeletionModel.js";
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            upload_preset: "noteTaking_app",
            resource_type: "image",
        }, (error, result) => {
            if (result) {
                resolve(result.secure_url);
            }
            else {
                reject(error);
            }
        });
        streamifier.createReadStream(buffer).pipe(stream);
    });
};
const extractPublicId = (url) => {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
    return match ? match[1] : "";
};
export const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        const error = new Error("Unauthorized: User info missing");
        error.statusCode = 401;
        throw error;
    }
    const notes = yield Note.find({ userid: req.user.id });
    res.json(notes);
});
export const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        const error = new Error("Unauthorized: User info missing");
        error.statusCode = 401;
        throw error;
    }
    const { title, content } = req.body;
    let imageUrl = "";
    if (req.file) {
        try {
            imageUrl = yield uploadToCloudinary(req.file.buffer);
        }
        catch (error) {
            const err = error;
            const customError = new Error(`Image upload failed: ${err.message}`);
            customError.statusCode = 500;
            throw customError;
        }
    }
    const note = yield Note.create({
        title: (title === null || title === void 0 ? void 0 : title.trim()) || "",
        content: (content === null || content === void 0 ? void 0 : content.trim()) || "",
        imageUrl,
        userid: req.user.id,
    });
    res.status(201).json(note);
});
export const editNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        const error = new Error("Unauthorized: User info missing");
        error.statusCode = 401;
        throw error;
    }
    const noteId = req.params.id;
    const updateData = Object.assign({}, req.body);
    const oldNote = yield Note.findById(noteId);
    if (!oldNote) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }
    if (req.file) {
        try {
            const imageUrl = yield uploadToCloudinary(req.file.buffer);
            updateData.imageUrl = imageUrl;
        }
        catch (error) {
            const err = error;
            const customError = new Error(`Image upload failed: ${err.message}`);
            customError.statusCode = 500;
            throw customError;
        }
    }
    const updatedNote = yield Note.findByIdAndUpdate(noteId, updateData, {
        new: true,
    });
    if (!updatedNote) {
        const error = new Error("Failed to update note");
        error.statusCode = 500;
        throw error;
    }
    const extractImageUrls = (html = "") => (html.match(/<img[^>]+src="([^"]+)"/g) || [])
        .map((tag) => { var _a; return (_a = tag.match(/src="([^"]+)"/)) === null || _a === void 0 ? void 0 : _a[1]; })
        .filter(Boolean);
    const oldImageUrls = extractImageUrls(oldNote.content);
    const newImageUrls = extractImageUrls(updateData.content || "");
    const unusedImages = oldImageUrls.filter((url) => !newImageUrls.includes(url));
    if (oldNote.imageUrl &&
        updateData.imageUrl &&
        oldNote.imageUrl !== updateData.imageUrl) {
        unusedImages.push(oldNote.imageUrl);
    }
    for (const url of unusedImages) {
        const exists = yield PendingDeletion.exists({ imageUrl: url });
        if (!exists) {
            yield PendingDeletion.create({ imageUrl: url, timestamp: new Date() });
        }
    }
    res.status(200).json({
        message: "Note updated successfully",
        note: updatedNote,
        markedForDeletion: unusedImages.length,
    });
});
export const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.user) {
        const error = new Error("Unauthorized: User info missing");
        error.statusCode = 401;
        throw error;
    }
    const note = yield Note.findById(req.params.id);
    if (!note) {
        const error = new Error("Note not found");
        error.statusCode = 404;
        throw error;
    }
    const urls = [
        ...(note.content.match(/<img[^>]+src="([^"]*cloudinary[^"]*)"/g) || [])
            .map((m) => { var _a; return (_a = m.match(/src="([^"]*)"/)) === null || _a === void 0 ? void 0 : _a[1]; })
            .filter(Boolean),
        ...(((_a = note.imageUrl) === null || _a === void 0 ? void 0 : _a.includes("cloudinary")) ? [note.imageUrl] : []),
    ];
    yield Note.findByIdAndDelete(req.params.id);
    const validUrls = urls.filter((u) => typeof u === "string");
    yield Promise.all(validUrls.map((url) => __awaiter(void 0, void 0, void 0, function* () {
        const publicId = extractPublicId(url);
        if (publicId) {
            try {
                yield cloudinary.uploader.destroy(publicId);
            }
            catch (err) {
                console.error("Failed to delete image:", publicId, err);
            }
        }
    })));
    res.status(200).json({
        message: "Note and its images deleted successfully",
        deletedImages: urls.length,
    });
});
export const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        const error = new Error("Unauthorized: User info missing");
        error.statusCode = 401;
        throw error;
    }
    if (!req.file) {
        const error = new Error("No image file provided");
        error.statusCode = 400;
        throw error;
    }
    try {
        const imageUrl = yield uploadToCloudinary(req.file.buffer);
        res.status(200).json({
            success: true,
            imageUrl,
            message: "Image uploaded successfully",
        });
    }
    catch (error) {
        const err = error;
        const customError = new Error(`Image upload failed: ${err.message}`);
        customError.statusCode = 500;
        throw customError;
    }
});
