export const getLocalDetailsData=()=>{
    const data= sessionStorage.getItem("moredetails")
    if(data){
     return JSON.parse(data)
    }
    else{
     return[]
    }
  }
 export const getLocalHotelData=()=>{
    const data= sessionStorage.getItem("myHotelData")
    if(data){
     return JSON.parse(data)
    }
    else{
     return[]
    }
  }

