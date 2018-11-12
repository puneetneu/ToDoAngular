import { Component, OnInit,OnDestroy, AfterViewInit,AfterViewChecked,AfterContentInit, SystemJsNgModuleLoader, Input } from '@angular/core';
import { DataService } from '../data.service';
import {ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory
} from '@angular/core';
import {CardComponent}  from '../card/card.component';
import {CardsectionComponent} from '../cardsection/cardsection.component';
import { nbind } from 'q';
import { exists } from 'fs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewChecked ,AfterContentInit, OnInit ,AfterViewInit ,OnDestroy {
   public tasktitle="";
   card$ :Object= null;
   public id=0;
   json:boolean = false;
   ngAfterViewInit()
   {
    
   }
   ngAfterContentInit()
   {
    
   } 
   ngOnDestroy()
   {
    
   }

   ngAfterViewChecked()
   {
    if(this.card$!==null && this.json==false)
    {
      this.cping();
      this.json=true;
    }
   }
   

  constructor(private data: DataService,private resolver: ComponentFactoryResolver) { 
    
  }

  ngOnInit() {
   
    
    this.data.getdata().subscribe(
      data => this.card$ = data  
    )
    // setTimeout(function() { this.cping(); }, 5000);
      
    this.notepmty(); 
  }


  
  
  
  onClick() : void 
    {
      let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    let datenew = mm + '/' + dd + '/' + yyyy;
        if(this.tasktitle=="") {
          alert("plz enter value");
          return;
        }
        
        this.id++;
        let object={
        id:0,
        tid:0,
        title : "",
        author:"",
        list:[]
          }

    let taskobject={
      id:1,
      title:"",
      date:""
    }
       
      object.id=this.id;
      object.tid=1;
      object.title=document.getElementById("title").innerHTML;
      object.author=document.getElementById("author").innerText;
      taskobject.title=this.tasktitle;
      taskobject.date=datenew;

      object.list.push(taskobject);
      this.data.addcard(object);
      this.data.changemessage("true"); 
      console.log()
    
    }
   
    componentRef: any;
  

@ViewChild("xx", { read: ViewContainerRef }) container;  
  
    createComponent() {
        this.container.clear(); 
       const factory = this.resolver.resolveComponentFactory(CardComponent);
        this.componentRef = this.container.createComponent(factory);
        
    }
 

    

  cping()
  {
    
    

    for ( let x of this.card$)
     {
      this.id++;
      let object={
      id:0,
      tid:0,
      title : "",
      author:"",
      list:[]
        }

      
      let mid=0;
        for ( let y of x.list)
        {
          mid++;
          let taskobject={
            id:0,
            title:"",
            date:""
          }
           taskobject.id=mid;
          taskobject.title=y.title;
          taskobject.date=y.date;
          object.list.push(taskobject);

        }
      object.id=this.id;
      object.tid=mid;
      object.title=x.title;
      object.author=x.author;
      this.data.addcard(object);
        
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
 
