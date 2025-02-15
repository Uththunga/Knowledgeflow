declare namespace google.accounts.oauth2 {
  interface TokenClient {
    requestAccessToken(config: { prompt: string }): void;
  }

  interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
  }

  function initTokenClient(config: {
    client_id: string;
    scope: string;
    callback: (response: TokenResponse) => void;
    error_callback?: (error: any) => void;
    hosted_domain?: string;
    redirect_uri?: string;
  }): TokenClient;
}

declare namespace gapi.client {
  function init(config: {
    apiKey: string;
    discoveryDocs: string[];
  }): Promise<void>;
  function setToken(token: { access_token: string }): void;

  namespace drive.files {
    function create(params: {
      resource: any;
      fields: string;
    }): Promise<{ result: { id: string } }>;
  }
}

declare namespace gapi {
  function load(api: string, callback: () => void): void;
}
