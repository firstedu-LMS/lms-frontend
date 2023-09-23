import ApiService from "@/services/ApiService";
import TokenService from "@/services/TokenService";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth' , {
    state : () => {
        return {
            user : {},
            roles : [],
            authenticated : !!TokenService.getToken(),
        }
    },

    actions : {
        async getUser() {
            return ApiService.get('user').then((res) => {
                this.setAuth(res.data)
            }).catch((res) => {
                console.log(res);
            })
        },
        setAuth(data)  {
            if (data.user) {
                this.user = data.user;
                this.roles = data.user.roles;
            } else if(data.roles) {
                this.user = data;
                this.roles  = data.roles;
            }
            this.authenticated = true
        },
        destroyAuth(){
            this.user = {};
            this.authenticated = false;
            TokenService.destroyToken();
        }
    }
})