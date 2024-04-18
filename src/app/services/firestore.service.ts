import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from '@angular/fire/firestore';
import { Event } from '../event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore) { }

  getAllEvents(collectionName: string): Observable<Event[]>{
    //return collection(this.firestore, collectionName);
    //regresar la colección de eventos con el formato de mi evento
    return new Observable(subscriber => {
      getDocs(collection(this.firestore, collectionName)).then((querySnapshot) => {
        let events: Event[] = [];
        querySnapshot.forEach((doc) => {
          let event: Event = {
            id: doc.id,
            title: doc.data()['title'],
            start: doc.data()['start'],
            end: doc.data()['end'],
            personName: doc.data()['extendedProps'].personName,
            phoneNumber: doc.data()['extendedProps'].phoneNumber,
            place: doc.data()['extendedProps'].place,
            notes: doc.data()['extendedProps'].notes
          }
          events.push(event);
        });
        subscriber.next(events);
      });
    });
  }

  //agregar un nuevo evento
  async addEvent(collectionName: string, data: any){
    await addDoc(collection(this.firestore, collectionName), data);
    return 'Evento agregado';
  }

  //eliminar un evento
  async deleteEvent(collectionName: string, id: string){
    //eliminar el evento de la base de datos
    await deleteDoc(doc(this.firestore, collectionName, id));
  }

  //editar un evento
  async editEvent(collectionName: string, id: string, data: any){
    //editar el evento en la base de datos
    await updateDoc(doc(this.firestore, collectionName), id, data);
    return 'Evento editado';
  }

}
