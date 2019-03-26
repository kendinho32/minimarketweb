import { Component, OnInit } from '@angular/core';
import { SliderService } from '../services/slider.service';
import { environment } from '../../environments/environment';
import { Slider } from '../models/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styles: [],
  providers: [SliderService]
})
export class SliderComponent implements OnInit {

  public url;
  public response: any;
  public sliders: Slider[];
  public sliderFirst: Slider;

  constructor(private sliderService: SliderService) {
      this.url = environment.apiBase;
  }

  ngOnInit() {
      this.getAllSlider();
  }

  getAllSlider() {
      this.sliderService.getSliders().subscribe(
            response => {
               this.response = response;
               console.log(this.response);
               if (this.response.success) {
                this.sliders = this.response.data;
                this.sliderFirst = this.sliders[0];
                this.sliders.splice(0, 1);
                console.log(this.sliders);
               }
            },
            error => {
                console.log(error);
            }
        );
  }

}
