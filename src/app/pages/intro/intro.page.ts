import { Component, CUSTOM_ELEMENTS_SCHEMA,OnInit ,ViewChild,ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { IonicModule } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { Swiper } from 'swiper';
import { Router } from '@angular/router';
import { KeyName } from '../../services/key-name';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IntroPage implements OnInit {
//@ViewChild(Swiper) slides: any; //slides: Swiper;
@ViewChild('swiper')
swiperRef: ElementRef | undefined;
swiper?: Swiper;

images = [
  'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  'https://images.unsplash.com/photo-1488229297570-58520851e868',
];

constructor(private router: Router, private key:KeyName) { }

ngOnInit() {
}

ionViewDidEnter(){
  // this.modalCtrl.dismiss()
}



swiperReady() {
  setTimeout(()=>{
    this.swiper = this.swiperRef?.nativeElement.swiper;
  },200);

}

next() {
  this.swiper?.slideNext();
  console.log('swiperclick',this.swiper);
}

async start() {
  await Preferences.set({ key: this.key.INTRO_SEEN, value: 'true' });
   this.router.navigateByUrl('/login', { replaceUrl: true });
  //this.router.navigateByUrl('/home', { replaceUrl: true });
}

}
