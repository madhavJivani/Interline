import config from '@/config/config.js'
import { Client, ID, Account } from 'appwrite';

export class Auth { 
    client = new Client();
    account;
    
    constructor() { 
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async signup({ email, password, firstName, lastName })   { 
        try {
            const res = await this.account.create(ID.unique(), email, password, `${firstName.trim()} ${lastName.trim()}`);
            // console.log(res);
            return res;
        } catch (error) {
            console.log("Error in auth-signup : ", error);
            return { status: false, error: error?.message || "Signup failed" };
        }
    }

    async login({ email,password}) { 
        try {
            const res = await this.account.createEmailPasswordSession(email, password);
            // console.log(res);
            return res;
        } catch (error) {
            console.log("Error in auth-login : ", error);
            return false;
        }
    }

    async getUser() { 
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            console.log("Error in auth-getUser : ",error);
        }
    }

    async logout() { 
        try {
            const res = await this.account.deleteSession("current");
            // console.log(res);
            return res;
        } catch (error) {
            console.log("Error in auth-logout : ",error);
        }
    }
    async OAuth() {
        try {
            const res = await this.account.createOAuth2Session(
                            "google",
                            "http://localhost:5173/",
                            "http://localhost:5173/fail"
            );
            // console.log(res);
            return res;
        } catch (error) {
            console.log("Error in auth-OAuth : ",error);
        }
    }
}

const auth = new Auth();
export default auth;