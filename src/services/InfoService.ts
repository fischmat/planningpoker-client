import { api } from "./API";
import type { ApplicationInfo } from "@/model/Model";


export const infoService = {
    async getInfo(): Promise<ApplicationInfo> {
        return (await api.get('/v1/info')).data
    }
}
