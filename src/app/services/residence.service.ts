import { Injectable } from '@angular/core';
import { Residence } from '../core/models/residence';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResidenceService {

  private list = new BehaviorSubject<Residence[]>([
    {
      id: 1,
      name: 'El fel',
      address: 'Borj Cedria',
      image: '../../assets/images/1.png',
      status: 'Disponible',
      favorite: false,
      likeBtn: 'Like',
    },
    {
      id: 2,
      name: 'El yasmine',
      address: 'Ezzahra',
      image: '../../assets/images/2.png',
      status: 'Disponible',
      favorite: false,
      likeBtn: 'Like',
    },
    {
      id: 3,
      name: 'El Arij',
      address: 'Rades',
      image: '../../assets/images/3.png',
      status: 'Vendu',
      favorite: false,
      likeBtn: 'Like',
    },
    {
      id: 4,
      name: 'El Anber',
      address: 'inconnu',
      image: '../../assets/images/4.png',
      status: 'En Construction',
      favorite: false,
      likeBtn: 'Like',
    },
  ]);

  list$ = this.list.asObservable();

  

  private whishlist = new BehaviorSubject<Residence[]>([]);
  myWishlist$ = this.whishlist.asObservable();


  constructor() {}

  getList(): Residence[] {
    return this.list.value;
  }

  

  getWishlist(): Residence[] {
    return this.whishlist.value;
  }

  updateWishlist(residence: Residence): void {
    const currtentWishList = this.whishlist.value;
    if (residence.favorite === true) {
      this.whishlist.next([...currtentWishList, residence]);
    } else if (residence.favorite === false){
      const updatedWishlist = currtentWishList.filter(
        (item) => item.id !== residence.id
      );
      this.whishlist.next(updatedWishlist);
    }
  }

}
