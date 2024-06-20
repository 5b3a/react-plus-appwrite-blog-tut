import config from '../config/config'
import {Client, ID, Databases, Query, Storage} from 'appwrite'


export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.setEndpoit(config.appwriteUrl),
        this.setProjecy(config.appwriteProjectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,image,status,userId}){
        try {
            await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite :: error :: appwrite/config.js:create",error);
        }
    }

    async updatePost(slug,{title,content,image,status}){
        try {
            await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite :: error :: appwrite/config.js:update",error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite :: error :: appwrite/config.js:delete", error);
            return false
        }
    }

    async getpost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite :: error :: appwrite/config.js:getPost",error);
            return false
        }
    }

    async listPosts(query = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                query
            )
        } catch (error) {
            console.log("Appwrite :: error :: appwrite/config.js:list posts",error);
            return false
        }
    }

    //file methods
    async uploadFile(file){
        try {
            return this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite :: error :: appwrite/config.js:upload file",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite :: error :: appwrite/config.js:delete file",error);
            return false
        }
    }

    previewFile(fileId){
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log("Appwrite :: error :: appwrite/config.js:delete file",error);
            return false
        }
    }
}

const service = new Service()
export default service