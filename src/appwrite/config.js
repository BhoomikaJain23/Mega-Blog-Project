import conf from '../conf/conf.js';
import { Client,ID,Databases,Storage,Query } from 'appwrite';

console.log(" config.js loaded");

export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        console.log(" Service constructor initialized");
    }

    async createPost({title,slug,content,featuredimage,status,userId}){
            console.log(" createPost function called with:", {title,slug,content,featuredimage,status,userId});
            console.log("this.databases exists?", !!this.databases);
            console.log("this.databases.createDocument exists?", typeof this.databases?.createDocument);
       try {
            console.log(" createPost called");
            console.log("Creating post with:", {title,slug,content,featuredimage,status,userId});
            console.log("Database ID:", conf.appwriteDatabaseId);
            console.log("Collection ID:", conf.appwriteCollectionId);
            
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId,
                }
            );
            console.log(" createDocument returned:", response);
            if (!response) {
                throw new Error("Appwrite createDocument returned empty response");
            }
            return response;
        } catch (error) {
            console.error("Appwrite createPost error:", error);
            console.error("Error message:", error.message);
            console.error("Full error details:", {
                message: error.message,
                code: error.code,
                status: error.status,
                type: error.type
            });
            throw error;
        }
    }

       async updatePost(slug,{title,content,featuredimage,status}){
        try{
            return await this.databases.updateDocument(
               conf.appwriteDatabaseId,
               conf.appwriteCollectionId,
               slug,
               {
                title,
                content,
                featuredimage,
                status
               } 
            )
        }catch(error){
            console.log("Appwrite service :: updatePost :: error",error);
            
        }
       }

       async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false;
        }
       }

       async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);            console.error("Full error object:", error);
            throw error;        }
       }

       async getPosts(queries=[Query.equal("status","active")]){
       try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        )
       } catch (error) {
        console.log("Appwrite service :: getPosts :: error",error);
        return false;
       }
       }

       async uploadFile(file){
        try {
           return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
           ) 
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return false;
        }
       }
 
       async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false;
        }
        }

       getFilepreview(fileId){
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
        
       } 

    }




const service = new Service();
export default service;