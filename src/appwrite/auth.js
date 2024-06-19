import config from '../config/config'
import {Account,Client,ID} from 'appwrite'

export class AUTHSERVICE{

    client = new Client()
    account;
    constructor() {

        this.setEndpoit(config.appwriteUrl),
        this.setProjecy(config.appwriteProjectId);
        this.account = new Account(this.client)
    }
}

const authService = new AUTHSERVICE();

export default authService