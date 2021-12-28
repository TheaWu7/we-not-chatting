import { AxiosInstance } from "axios";

declare global {
  declare module globalThis {
    var axios: AxiosInstance
  }
}
