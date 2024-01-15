import {ElNotification, ElMessageBox, ElMessage} from "element-plus";
import nprogress from 'nprogress'

// 成功提示，toast通常用于描述一种短暂的用户界面通知或消息，它以弹出的形式显示在屏幕上
export function toast(message, type = 'success', dangerouslyUseHTMLString = false, duration = 3000) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration
    })
}

export function showModal(content, type = 'warning', title = '') {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type
        }
    )
}

//显式全屏loading
export function showFullLoading() {
    nprogress.start()
}

//关闭全屏loading
export function hideFullLoading() {
    nprogress.done()
}

export function showPrompt(tip, value = "") {
    return ElMessageBox.prompt('请输入新的图片名称', 'Tip', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value
    })
}