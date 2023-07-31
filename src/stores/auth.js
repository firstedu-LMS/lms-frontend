import router from "@/router";
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
        setAuth(user){
            this.user = user;
            this.authenticated = true;
        },
        verifyAuth(middleware){
            if (TokenService.getToken()) {
                ApiService.get(`${middleware}/user`).then((res) => {
                    this.setAuth(res.data)
                }).catch(() => {
                    this.destroyAuth();
                    router.go(-1)
                })
            } else {
                this.destroyAuth();
                router.go(-1)
            }
        },
        destroyAuth(){
            this.user = {};
            this.authenticated = false;
            TokenService.destroyToken();
        }
    }
})