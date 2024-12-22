import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const appFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: "voluntariat", url: file.url, type: file.type, size: file.size };
    })
} satisfies FileRouter;

export type AppFileRouter = typeof appFileRouter;
