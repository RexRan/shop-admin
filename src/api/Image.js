import service from "~/axios.js";

export function getImageList(id,page){
    return service.get(`/admin/image_class/${id}/image/${page}`)
}