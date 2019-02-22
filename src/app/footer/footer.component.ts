import { Component, OnInit, DoCheck } from '@angular/core';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [UtilService]
})
export class FooterComponent implements OnInit, DoCheck {

    public identity;

    constructor(private utilService: UtilService) { }

    ngDoCheck(): void {
         this.identity = this.utilService.getIdentity();
    }

    ngOnInit() {
        this.identity = this.utilService.getIdentity();
    }

}
