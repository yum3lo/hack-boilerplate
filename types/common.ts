export interface NamedEntity {
  id: number;
  name: string;
}

export interface ResponseMessage {
  message: string;
  status: string;
}

// export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}