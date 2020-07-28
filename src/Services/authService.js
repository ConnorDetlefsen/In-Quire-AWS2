import http from "./httpService";
import { apiEndpoint } from "../config.json";

const authEndpoint = apiEndpoint + "/user";

export function login(email, password) {
  return http.get(authEndpoint, { email, password });
}
export default {
  login,
};
