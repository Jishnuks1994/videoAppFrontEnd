import { BASE_URL } from "./baseurl";
import { commonRequest } from "./commonRequest";


// video add       -post -url, body
export const addVideo= async(body)=>{
    return await  commonRequest("POST",`${BASE_URL}/videos`,body)
}


// get all videos  -get -url
export const getAllVideo= async()=>{
    return await  commonRequest("GET",`${BASE_URL}/videos`,"")
}

// add category    -pose -url, body
export const addCategory= async(body)=>{
    return await  commonRequest("POST",`${BASE_URL}/categories`,body)
}

// delete          -delete -url
export const removeVideo= async(id)=>{
    return await  commonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})
}

//get all categories
export const getAllCategories= async()=>{
    return await  commonRequest("GET",`${BASE_URL}/categories`,{})
}

// delete category         -delete -url
export const removeCategory= async(id)=>{
    return await  commonRequest("DELETE",`${BASE_URL}/categories/${id}`,{})
}

//get all history
export const getHistory= async()=>{
    return await  commonRequest("GET",`${BASE_URL}/histories`,{})
}

//add history
export const addHistory= async(body)=>{
    return await  commonRequest("POST",`${BASE_URL}/histories`,body)
}



//drag and drop

//get single video
export const getVideo= async(id)=>{
    return await  commonRequest("GET",`${BASE_URL}/videos/${id}`,{})
}

// add video to category -post -url, body
export const updateCategory= async(id,body)=>{
    return await  commonRequest("PUT",`${BASE_URL}/categories/${id}`,body)
}

