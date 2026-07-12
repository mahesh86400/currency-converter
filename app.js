let input=document.querySelector("input");
let btn=document.querySelector("button");
let temp=document.querySelector(".temp");
let city=document.querySelector(".city");
let humidity=document.querySelector(".humidity");
let wspeed=document.querySelector(".wspeed");
let neercity=document.querySelector(".neercity");


async function whether_cond() {
    temp.innerText ="loading...."
    let city2=input.value;
    let url;
    if(input.value===""){
        url =`https://wttr.in/?format=j1`;//no city, auto detect
        city.innerText = "Auto-detected location";
    }else{
        url =`https://wttr.in/${city2}?format=j1`;
        city.innerText = input.value;
    }
    let response=await fetch(url);   
    let data=await response.json();
    
    temp.innerText=data.current_condition[0].temp_C+"°C";//temp in city

    neercity.innerText=data.nearest_area[0].areaName[0].value;//nearest location

    // city.innerText=input.value;//city   => iam adding this line in the if else block
    
    humidity.innerText=data.current_condition[0].humidity;//humidity in city
   
    wspeed.innerText=data.current_condition[0].windspeedKmph;//wind speed in city
    
}
btn.addEventListener("click",()=>{
    whether_cond();
});
input.addEventListener("keydown", (evt)=>{
  if(evt.key=="Enter"){
    whether_cond();
  }
});
