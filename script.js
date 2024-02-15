
let search = document.getElementById("search-input");

search.addEventListener("keydown", (e => {

    if(e.key == "Enter"){
        console.log(search.value);
        fetch("https://striveschool-api.herokuapp.com/books") 
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            console.log(data)
            setImages(data, search.value)
        })
        .catch((err) => console.log("problem: ", err));
    }

}));



fetch("https://striveschool-api.herokuapp.com/books") 
  .then(resp => {
       return resp.json()
  })
  .then(data => {
   // console.log(data)
      setImages(data,'')
  })
.catch((err) => console.log("problem: ", err));


  function clickInfoButton(event)
  { 

  }

  function createDetailPage(asin)
  {
        let cardBodies = document.getElementsByClassName("card-body");
        let i = 1;
        for(card of cardBodies)
        {
            let a = document.createElement("a");
            a.id = asin;
            console.log(a.id);
            a.setAttribute("href","#");
            a.innerHTML += '<i class="fas fa-info-circle" style="color: #CCC0FC;"></i>';
            a.classList.add("info-button");
            a.addEventListener("click",clickInfoButton);  
            card.appendChild(a);
        }
    /*
        let cardBodies = document.getElementsByClassName("card-body");
        let i = 1;
        for(card of cardBodies)
        {
            let a = document.createElement("a");
            a.id = card.asin;
            console.log(a.id);
            a.setAttribute("href","#");
            a.innerHTML += '<i class="fas fa-info-circle" style="color: #CCC0FC;"></i>';
            a.classList.add("info-button");
            a.addEventListener("click",clickInfoButton);  
            card.appendChild(a);
        }
      */
  }

  function setImages(data, searchText) {
 
    elementCount = 0;
    let display = document.getElementById("images");
    display.innerHTML = '';

    let i = 1;

    data.forEach(element => {
              
        let src = element.img;
        let title = element.title;
        let lowTitle = title.toLowerCase();
        let text = searchText.toLowerCase();
        let asin = element.asin;
        
        if(lowTitle.includes(text)){
            

            if(title !== ''){
                display.innerHTML += '<div class="card col-1 m-4" style="width: 18rem;"> <img id="img"+i class="card-img-top" src="'+src+'" alt="Card image cap"> <div class="card-body">  <h5 id="title"+i class="card-title"> '+title+'</h5>         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>  <a href="#" id="button"+i onclick="buttonClick(event)" class="btn btn-primary">Add to cart</a></div></div>'                           
                
            }
          
        }  
       
        i++;
        
    });


} 

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

function buttonClick(event)
{
    let element = event.target;
    let cart = document.getElementById("cart");
    let parent = element.parentNode;
    let firstChild = parent.firstChild;

    if(!hasClass(element,"btn-remove")){
        element.classList.add("btn-remove"); // apply css rules    
        let newItem = document.createElement("p");      
        newItem.innerHTML = firstChild.nextSibling.innerHTML;
        newItem.id = firstChild.nextSibling.innerHTML;
        cart.appendChild(newItem);
    }       
    else {
        element.classList.remove("btn-remove"); // remove css rules       
        let item = document.getElementById(firstChild.nextSibling.innerHTML);
        cart.removeChild(item);
        item.remove();
    }

    element.innerHTML = element.innerHTML === "Remove from Cart" ? "Add to Cart" : "Remove from Cart"; // change button's text
}
