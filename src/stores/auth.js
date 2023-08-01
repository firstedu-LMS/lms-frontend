import ApiService from "@/services/ApiService";
import TokenService from "@/services/TokenService";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth' , {
    state : () => {
        return {
            user : {},
            authenticated : false
        }
    },

    actions : {
        verifyAuth(middleware){
            if (TokenService.getToken()) {
                ApiService.get(`${middleware}/user`).then((res) => {
                    this.user = res.data
                }).catch(() => {
                    this.destroyAuth();
                })
            } else {
                this.destroyAuth();
            }
        },
        destroyAuth(){
            this.user = {};
            this.authenticated = false;
            TokenService.destroyToken();
        }
    }
})