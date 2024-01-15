import service from "~/axios.js";

// 获取指定分类下的图片列表
export function getImageList(id,page){
    return service.get(`/admin/image_class/${id}/image/${page}`)
}

export function updateImage(id, name) {
    return service.post(`/admin/image/${id}`, {name})
}

export function deleteImage(ids) {
    return service.post(`/admin/image/delete_all`,{ids})
}