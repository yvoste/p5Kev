const images = document.querySelectorAll(".grid-item"); 

//1.add the filters to the html page
const categories = new Set();
for(let image of images){
    categories.add(image.getAttribute("imgCategory")); 
}

for(let category of categories){
   const filtersList = document.querySelector(".filters");
   let filter = document.createElement("li"); 
   filter.setAttribute("class", "filter"); 
   filter.innerText = category; 

   filtersList.appendChild(filter);  
}

//2.add the event listener to highlight the filters when clicked and event listener to filter the images grid
const filters = document.querySelectorAll(".filter"); 
for(let filter of filters){
    filter.addEventListener("click", ()=>{
        highlitghedFilter(filter);
        filterGrid(filter.innerText);   
    })
}


function highlitghedFilter(filter){
    for(let f of filters){
        f.classList.remove("active-filter"); 
    }
    filter.classList.add("active-filter");
}

function filterGrid(filter){
    const grid = document.querySelector(".grid");
    grid.innerHTML = "";
    const imagesGridArray = Array.from(images);
    

    if(filter === "Tous"){
       for(let image of imagesGridArray){
        grid.appendChild(image);
       } 
    }   
    const filteredImagesGrid = imagesGridArray.filter(image => image.getAttribute("imgCategory") === filter); 
    
    for(let image of filteredImagesGrid){
        grid.appendChild(image); 
    } 
}


//3.add the event listener to the images to open the lightbox
images.forEach(image =>{
    image.addEventListener("click",(e) =>{
        //create the lightbox html
        const clickedImageCategory = e.target.getAttribute("imgCategory"); 
        let filteredImages = Array.from(images).filter(image => image.getAttribute("imgCategory") === clickedImageCategory);
        let currentIndex;
         
        for(let i in filteredImages){
            if(filteredImages[i] === e.target){
                    currentIndex = i; 
              }
        }    

        const lightbox = document.getElementById("lightbox");
        lightbox.classList.add("active"); 

        //create the image container
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("imgContainer"); 
        imgContainer.style.backgroundColor ="white";
        imgContainer.style.width = "500px";
        imgContainer.style.padding = "15px";

        //create the img html
        const img = document.createElement("img"); 
        img.src = filteredImages[currentIndex].getAttribute("src"); 
        img.style.width = "100%"; 
        img.style.width = "100%";
        img.src = filteredImages[currentIndex].src; 
        
        //prevBtn
        const prevBtn = document.createElement("div"); 
        prevBtn.classList.add("prevBtn");
        prevBtn.innerText = "<";
        prevBtn.addEventListener("click", ()=>{
           if(currentIndex <= 0){
                currentIndex = filteredImages.length - 1;   
           }else{
            currentIndex --;
           }
           
           img.src = filteredImages[currentIndex].src; 
        })  

        //nextBtn
        const nextBtn = document.createElement("div"); 
        nextBtn.classList.add("nextBtn"); 
        nextBtn.innerText = ">"; 
        nextBtn.addEventListener("click", ()=>{ 

            if(currentIndex >= filteredImages.length - 1){ 
                currentIndex = 0;
        
            } else{
                currentIndex ++;
            }    

            img.src = filteredImages[currentIndex].src;  
        }); 

        
        //remove previous image inside the lightbox
        while(lightbox.firstChild){
            lightbox.removeChild(lightbox.firstChild); 
        }
        
        //append the new image in the lightbox
        imgContainer.appendChild(img); 
        imgContainer.appendChild(prevBtn); 
        imgContainer.appendChild(nextBtn); 
        lightbox.appendChild(imgContainer);
        
        //add event listener to close the lightbox 
        lightbox.addEventListener("click", (e)=>{
        if(e.target !== e.currentTarget) return; 
        lightbox.classList.remove("active");
        })
    })
})



  









