import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cardsection',
  templateUrl: './cardsection.component.html',
  styleUrls: ['./cardsection.component.scss']
})
export class CardsectionComponent implements OnInit {

  message :string;
  constructor(private data:DataService) { 
    
  }
  
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
        
  }

  

}
