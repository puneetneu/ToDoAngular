import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public task="";
  card$ :Object;
  cards :Array<any>=[] ;
  
  constructor(private data: DataService) {
     //this.cards.push("tanwar");
     
    }

  ngOnInit() {
    this.data.getdata().subscribe(
      data => this.card$ = data 
    )

    this.data.newcarsubject.subscribe(
      //data =>console.log(data)
      data => this.cards.push(data)
    )
    
    this.notepmty();
  }
    
  addtask(event)
  { 
    this.notepmty();
    let taskobject={
      id:0,
      title:"",
      date:"friday"
    }
     for (  let x of this.cards)
     {
       if(x.id==event.target.parentElement.parentElement.id)
       {
         
         let p=event.target.parentElement.parentElement.getElementsByClassName("input_task");
         let task_input=p[0].value;
         if(task_input===""){
           alert("plz enter something");
           return;
         }
        taskobject.title=task_input
         taskobject.id=++x.tid;
         x.list.push(taskobject);
       }
     }
     this.task="";
     
  }

  closecard(event)
  {
    for (  let x of this.cards)
     {
       if(x.id==event.target.parentElement.parentElement.id)
       {
        event.target.parentElement.parentElement.style.display="none";
       }
     }
  }
   

  closetask(event)
  {
    for ( let x of this.cards)
     {
       
       if(x.id==event.target.parentElement.parentElement.parentElement.id)
       {
         
        for ( let y of x.list)
        {
          if(y.id==event.target.parentElement.id)
          {
            
            event.target.parentElement.style.display="none";
          }
          
        }
        
       }
     }
  }


  star(event)
  {
    for ( let x of this.cards)
     {
       
       if(x.id==event.target.parentElement.parentElement.parentElement.id)
       {
         
        for ( let y of x.list)
        {
          if(y.id==event.target.parentElement.id)
          {
            if(event.target.style.color=="red")
            {event.target.style.color="";}
            else 
            {
              event.target.style.color="red";
            }        
          }
          
        }
        
       }
     }
  }


  notepmty()
{
let tryv = document.querySelectorAll("[contenteditable=true]");
for (let i = 0; i < tryv.length; i++) {
    tryv[i].addEventListener("blur", function(evt){
        if(this.innerText.length===0)
          this.innerText=this.id;

    })

}
}
 

}

