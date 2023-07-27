import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  getFirestore() {
    return this.firebaseAdmin.firestore();
  }
  getBucket() {
    return this.firebaseAdmin.storage().bucket();
  }
  async catchLovycaAppUsers(uid: string) {
    try {
      const ref = this.getFirestore().collection('users').doc(uid);
      const doc = await ref.get();
      if (!doc.exists) {
        throw new Error('usuário não existe no lovycaApp');
      }

      return {
        id: uid,
        name: doc.data().name,
        email: doc.data().email,
        phone: doc.data().cellphone,
        cpf: doc.data().cpf,
        imageUrl:
          doc.data().imageUrl ??
          'https://firebasestorage.googleapis.com/v0/b/lyc-tom-homol.appspot.com/o/caas%2Fmedia%2Fsempicture.png?alt=media&token=b46de9f4-2f52-4819-984c-0e5ac0910cb7',
      };
    } catch (err) {
      console.log(err.message);
    }
  }
  async verifyIdToken(token: string) {
    try {
      const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (err) {
      console.log('Erro ao verificar o token:', err);
      throw new Error('Token de autenticação inválido');
    }
  }
  async getDocuments(collectionPath: string) {
    const collectionRef = this.getFirestore().collection(collectionPath);
    const snapshot = await collectionRef.get();
    const documents = snapshot.docs.map((doc) => doc.data());
    return documents;
  }

  async createDocument(collectionPath: string, data: any) {
    const collectionRef = this.getFirestore().collection(collectionPath);
    const documentRef = await collectionRef.add(data);
    return documentRef.id;
  }
  async signUp(collectionPath: string, uid: string, data: any) {
    const collectionRef = this.getFirestore()
      .collection(collectionPath)
      .doc(uid);

    await collectionRef.set(data);

    const documentSnapshot = await collectionRef.get();
    if (documentSnapshot.exists) {
      const documentData = documentSnapshot.data();
      return documentData.writeTime;
    } else {
      throw new Error('O documento não foi criado corretamente.');
    }
  }

  async updateDocument(collectionPath: string, data: any, docId: string) {
    const collectionRef = this.getFirestore()
      .collection(collectionPath)
      .doc(docId)
      .update(data);
    return (await collectionRef).writeTime;
  }
}
