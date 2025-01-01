import { Client, Account,  Databases,Storage } from "appwrite";
import config from '@/config.js'

const client = new Client().setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
export const account = new Account(client);
export const db = new Databases(client, config.appwriteDbId, config.appwriteCollectionId);
export const bucket = new Storage(client, config.appwriteBucketId)
