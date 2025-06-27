var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v2 as cloudinary } from "cloudinary";
import Note from "../models/noteModel.js";
import PendingDeletion from "../models/pendingDeletionModel.js";
const extractPublicId = (url) => {
    const matches = url.match(/\/upload\/(?:v\d+\/)?(.+)\./);
    return matches ? matches[1] : "";
};
export const cleanupPendingDeletions = () => __awaiter(void 0, void 0, void 0, function* () {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const candidates = yield PendingDeletion.find({
        timestamp: { $lt: oneHourAgo },
    });
    for (const entry of candidates) {
        const stillUsed = yield Note.exists({
            $or: [
                { content: { $regex: entry.imageUrl } },
                { imageUrl: entry.imageUrl },
            ],
        });
        if (!stillUsed) {
            const publicId = extractPublicId(entry.imageUrl);
            yield cloudinary.uploader.destroy(publicId);
            yield entry.deleteOne();
        }
        else {
            yield entry.deleteOne();
        }
    }
});
