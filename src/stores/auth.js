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