import axios from "axios";
import TokenService from "./TokenService";

class ApiService {
    config = {};
    static setConfig(){
        let token = TokenService.getToken();
        return {
            headers : {'Authorization' : `Bearer ${token}`}
        };
    }

    static get(url) {
        let config =  this.setConfig();
        return axios.get(url , config)
    }

    static post(url , data) {
        let config = this.setConfig()
        return axios.post(url , data , config)
    }

    static put(url , data) {
        let config = this.setConfig()
        return axios.put(url , data , config)
    }

    static patch(url , data) {
        let config = this.setConfig()
        return axios.patch(url , data , config)
    }

    static delete(url) {
        let config = this.setConfig()
        return axios.delete(url , config)
    }
}

export default ApiService