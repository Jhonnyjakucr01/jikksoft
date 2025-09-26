import axios from "axios";
import { BASE_URL } from "../config/api";

export const client = axios.create({
  baseURL: BASE_URL,
});
