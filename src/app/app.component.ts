import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/services/rest.service';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'lightbox';
  slideIndex : number;
  allUrl: any[] = [];
  counter: number = 0;
  allImages: any = [];

  constructor(private rest: RestService){

  }
   ngOnInit(){

      this.getAllImages();
                
  }
  openModal() {
    document.getElementById('myModal').style.display = "block";
  }
  
  closeModal() {
    document.getElementById('myModal').style.display = "none";
  }

  showSlides(n) {
     let i;
    let slides = document.getElementsByClassName("mySlides")  as HTMLCollectionOf<HTMLElement>;
  
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
       
    }   
    slides[this.slideIndex-1].style.display = "block";

    console.log("-->"+ n);
    
 }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  // API CALL

  getAllImages() {
    this.allImages = [];
    let returnObj = {};
    this.rest.getImages().subscribe((data) => {
      this.allImages = data;
      data.forEach(objImage => {
        var returnObj = {
          url: objImage.thumbnailUrl,
          id: this.counter++
        };
        // this.allUrl.push(objImage.thumbnailUrl + "id->"+this.counter++);
        this.allUrl.push(returnObj);
      });

      for(let i =0 ;i<100 ; i ++)
      { 
        console.log("-->" + this.allUrl[i].url + "-->" + this.allUrl[i].id);
      }
     
    });
}

}
