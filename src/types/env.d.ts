/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Variables del cliente (visibles en el browser)
  readonly VITE_APP_ENV: 'development' | 'production';
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_GA_TRACKING_ID?: string;
  // NOTA: OPENAI_API_KEY ya NO está aquí - se maneja en el servidor
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
