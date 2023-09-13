import ApiService from "@/services/ApiService";
import TokenService from "@/services/TokenService";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth' , {
    state : () => {
        return {
            user : {},
            authenticated : !!TokenService.getToken(),
        }
    },

    actions : {
        setAuth(user)  {
            this.user = user,
            this.authenticated = true
        },
        verifyAuth(middleware){
            let token = TokenService.getToken();
            if (token) {
                ApiService.get(`${middleware}/user`).then((res) => {
                    this.setAuth(res.data)
                }).catch((res) => {
                    console.log(res);
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