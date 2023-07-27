import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';

@Injectable()
export class AppService {
  constructor(
    private readonly firebaseService: FirebaseService,

  ){}
  async getAllUsers() {
    try {
      const collection = "users";
      const users = await this.firebaseService.getDocuments(collection);
  
      users.sort((a, b) => b.pontuation - a.pontuation);
  
      return users;
    } catch (error) {
      // Trate o erro adequadamente se necessário
      console.error("Erro ao obter usuários:", error);
      throw new Error("Erro ao obter usuários.");
    }
  }
  

  async createUserPontuation (name:string , pontuation:number){
    try {
      const data = {name:name , pontuation:pontuation}
      let collection = "users"
      const create = await this.firebaseService.createDocument(collection , data);
      return create
    } catch (error) {
      throw error
    }
  }
}
