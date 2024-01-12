import service from "~/axios.js";

export function getImageClass(page){
    return service.get(`/admin/image_class/${page}`)
}
export function createImageClass(data){
    return service.post('/admin/image_class', data)
}
export function updateImageClass(id,data){
    return service.post(`/admin/image_class/${id}`,data)
}
export function deleteImageClass(id){
    return service.post(`/admin/image_class/${id}/delete`)
}