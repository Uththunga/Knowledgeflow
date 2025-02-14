import { google } from "googleapis";

interface UploadOptions {
  folderId?: string;
  mimeType?: string;
}

export class GoogleDriveService {
  private static instance: GoogleDriveService;
  private drive;

  private constructor() {
    const auth = new google.auth.OAuth2(
      import.meta.env.VITE_GOOGLE_CLIENT_ID,
      import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
      import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    );

    this.drive = google.drive({ version: "v3", auth });
  }

  public static getInstance(): GoogleDriveService {
    if (!GoogleDriveService.instance) {
      GoogleDriveService.instance = new GoogleDriveService();
    }
    return GoogleDriveService.instance;
  }

  async createFolder(name: string, parentFolderId?: string): Promise<string> {
    const fileMetadata = {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentFolderId ? [parentFolderId] : undefined,
    };

    const response = await this.drive.files.create({
      requestBody: fileMetadata,
      fields: "id",
    });

    return response.data.id;
  }

  async uploadFile(file: File, options?: UploadOptions): Promise<string> {
    const fileMetadata = {
      name: file.name,
      parents: options?.folderId ? [options.folderId] : undefined,
    };

    const media = {
      mimeType: options?.mimeType || file.type,
      body: file,
    };

    const response = await this.drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id, webViewLink",
    });

    return response.data.webViewLink;
  }

  async uploadAudiobook(files: File[], metadata: any): Promise<string[]> {
    // Create a folder for the audiobook
    const folderName = `${metadata.title} - ${metadata.author}`;
    const folderId = await this.createFolder(folderName);

    // Upload each file to the folder
    const uploadPromises = files.map((file) =>
      this.uploadFile(file, { folderId }),
    );

    return Promise.all(uploadPromises);
  }

  async uploadContent(
    files: File[],
    format: string,
    metadata: any,
  ): Promise<string[]> {
    if (format === "audiobook") {
      return this.uploadAudiobook(files, metadata);
    }

    // For single file formats
    const [file] = files;
    const url = await this.uploadFile(file);
    return [url];
  }
}

export const googleDrive = GoogleDriveService.getInstance();
