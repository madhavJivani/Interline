import config from '@/config.js'
import { Client, Databases, ID, Storage, Query } from 'appwrite';

export class Service{ 
    client = new Client();
    databases;
    bucket;

    constructor() { 
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createDocument({userId,fileName,language,version,code}) {
        try {
            const res = await this.databases.createDocument(
                config.appwriteDbId,
                config.appwriteCollectionId,
                ID.unique(),
                {userId,fileName,language,version,code} 
            );
            // console.log(res);
            return res;
        } catch (error) {
            console.log("Appwrite createDocument error", error);
        }
    }

    async listDocuments() {
        try {
            const res = await this.databases.listDocuments(
                config.appwriteDbId,
                config.appwriteCollectionId,
            );
            // console.log(res);
            return res;
        } catch (error) {
            console.log("Appwrite listDocs error", error);
        }
    }

    async listDocument( id ) {
        // console.log(id)
        try {
            const res = await this.databases.listDocuments(
                config.appwriteDbId,
                config.appwriteCollectionId,
                [
                    Query.equal('userId', id)
                ]
            );
            // console.log(res);
            return res;
        } catch (error) {
            console.log("Appwrite listDoc-id error", error);
        }
    }

    async listDocumentByFileName(id, name) {
        
        console.log(id,name)
        try {
            const res = await this.databases.listDocuments(
                config.appwriteDbId,
                config.appwriteCollectionId,
                [
                    Query.equal('userId', id),
                    Query.equal('fileName', name)
                ]
            );
            // console.log(res);
            return res;
        } catch (error) {
            console.log("Appwrite listDoc-id-fileName error", error);
        }
    }

    async listDocumentByLanguage(id, lang) {
        // console.log(id)
        try {
            const res = await this.databases.listDocuments(
                config.appwriteDbId,
                config.appwriteCollectionId,
                [
                    Query.equal('userId', id),
                    Query.equal('language', lang)
                ]
            );
            // console.log(res);
            return res;
        } catch (error) {
            console.log("Appwrite listDoc-id-lang error", error);
        }
    }
}


const service = new Service();

export default service;
