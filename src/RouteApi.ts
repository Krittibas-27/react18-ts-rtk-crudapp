import axios from "axios";
import { json_server_url } from "./config";

export const BaseApiJson = axios.create({
    baseURL: json_server_url
})