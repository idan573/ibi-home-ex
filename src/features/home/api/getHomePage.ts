import { helloService } from "../../../services/hello/helloService"

export const getHomePageMessage = async ()=> {
    const res = await helloService.get();
    return res?.data?.message;
}