/* eslint-disable no-useless-catch */
import config from '../config/config'
import {Account,Client,ID} from 'appwrite'

export class AUTHSERVICE{

    client = new Client()
    account;
    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
            try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            if (userAccount) {
                return this.login({email,password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try {
            
            const accountStatus =  await this.account.createEmailPasswordSession(email,password)
            if (!accountStatus) {
                return null
            } else {
                return accountStatus
            }
        } catch (error) {
            throw error
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }
}


const authService = new AUTHSERVICE();

export default authService