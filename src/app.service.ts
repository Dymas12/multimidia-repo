import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';

@Injectable()
export class AppService {
  constructor(
    private readonly firebaseService: FirebaseService,

  ){}
 
  async createProduct (name:string , price:number , description:string , image:string ){
    try {
      const data = {name:name , price:price , description:description , image:image}
      let collection = "users"
      const create = await this.firebaseService.createDocument(collection , data);
      return create
    } catch (error) {
      throw error
    }
  }


  async getAllProducts() {
    try {
      const collection = "users";
      const users = await this.firebaseService.getDocuments(collection);
   return users;
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
      throw new Error("Erro ao obter usuários.");
    }
  }
}
