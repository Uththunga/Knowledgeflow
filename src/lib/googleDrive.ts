interface UploadOptions {
  folderId?: string;
  mimeType?: string;
}

interface GoogleDriveConfig {
  clientId: string;
  apiKey: string;
  scope: string;
}

export class GoogleDriveService {
  private static instance: GoogleDriveService;
  private tokenClient: google.accounts.oauth2.TokenClient;
  private accessToken: string | null = null;

  private constructor() {
    this.initClient();
  }

  private async initClient() {
    try {
      console.log("Initializing Google Drive client...");
      await new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.onload = () => {
          console.log("GAPI script loaded");
          gapi.load("client", async () => {
            try {
              await gapi.client.init({
                apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
                discoveryDocs: [
                  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
                ],
              });
              console.log("GAPI client initialized");
              resolve();
            } catch (error) {
              console.error("Error initializing GAPI client:", error);
              throw error;
            }
          });
        };
        document.body.appendChild(script);
      });

      await new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = () => {
          console.log("Google Sign-In script loaded");
          resolve();
        };
        document.body.appendChild(script);
      });

      this.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/drive.file",
        callback: (response) => {
          if (response.access_token) {
            console.log("Received access token");
            this.accessToken = response.access_token;
            gapi.client.setToken(response);
          }
        },
        error_callback: (error) => {
          console.error("Auth error:", error);
        },
        hosted_domain: window.location.hostname,
        redirect_uri: window.location.origin,
      });
      console.log("Token client initialized");
    } catch (error) {
      console.error("Error in initClient:", error);
      throw error;
    }
  }

  public static getInstance(): GoogleDriveService {
    if (!GoogleDriveService.instance) {
      GoogleDriveService.instance = new GoogleDriveService();
    }
    return GoogleDriveService.instance;
  }

  async authorize(): Promise<void> {
    if (!this.accessToken) {
      console.log("Requesting access token...");
      return new Promise((resolve, reject) => {
        try {
          this.tokenClient.requestAccessToken({
            prompt: "consent",
            callback: (response) => {
              if (response.error) {
                console.error("Auth error:", response);
                reject(response);
              } else {
                console.log("Authorization successful");
                resolve();
              }
            },
          });
        } catch (err) {
          console.error("Error in authorize:", err);
          reject(err);
        }
      });
    }
    console.log("Already authorized");
  }

  async createFolder(name: string, parentFolderId?: string): Promise<string> {
    try {
      await this.authorize();
      console.log("Creating folder:", name);

      const fileMetadata = {
        name,
        mimeType: "application/vnd.google-apps.folder",
        parents: parentFolderId ? [parentFolderId] : undefined,
      };

      const response = await gapi.client.drive.files.create({
        resource: fileMetadata,
        fields: "id",
      });

      console.log("Folder created with ID:", response.result.id);
      return response.result.id;
    } catch (error) {
      console.error("Error creating folder:", error);
      throw error;
    }
  }

  async uploadFile(file: File, options?: UploadOptions): Promise<string> {
    try {
      await this.authorize();
      console.log("Uploading file:", file.name);

      const metadata = {
        name: file.name,
        mimeType: options?.mimeType || file.type,
        parents: options?.folderId ? [options.folderId] : undefined,
      };

      const form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" }),
      );
      form.append("file", file);

      const response = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${this.accessToken}` },
          body: form,
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload failed:", errorText);
        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`,
        );
      }

      const result = await response.json();
      console.log("File uploaded successfully:", result);
      return `https://drive.google.com/file/d/${result.id}/view`;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async uploadAudiobook(files: File[], metadata: any): Promise<string[]> {
    try {
      await this.authorize();
      console.log("Uploading audiobook:", metadata.title);

      const folderName = `${metadata.title} - ${metadata.author}`;
      const folderId = await this.createFolder(folderName);

      console.log("Uploading audiobook files to folder:", folderId);
      const uploadPromises = files.map((file) =>
        this.uploadFile(file, { folderId }),
      );

      const urls = await Promise.all(uploadPromises);
      console.log("Audiobook upload complete:", urls);
      return urls;
    } catch (error) {
      console.error("Error uploading audiobook:", error);
      throw error;
    }
  }

  async uploadContent(
    files: File[],
    format: string,
    metadata: any,
  ): Promise<string[]> {
    try {
      console.log("Starting content upload:", { format, files: files.length });

      if (format === "audiobook") {
        return this.uploadAudiobook(files, metadata);
      }

      const [file] = files;
      const url = await this.uploadFile(file);
      console.log("Content upload complete:", url);
      return [url];
    } catch (error) {
      console.error("Error in uploadContent:", error);
      throw error;
    }
  }
}

export const googleDrive = GoogleDriveService.getInstance();
