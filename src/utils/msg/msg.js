import { ElMessage } from "element-plus";

export default class Msg {
    static msg(msg, type) {
        ElMessage({
            showClose: true,
            message: msg,
            type: type,
            duration: 1500
        })
    }

    static success(msg) {
        this.msg(msg, 'success')
    }

    static fail(msg) {
        this.msg(msg)
    }
}