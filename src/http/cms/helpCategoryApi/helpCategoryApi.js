import { post, get } from "../index"

const BASE_URL = 'cms-help-category/'

const add = (data) => {
    return post(BASE_URL + 'add', data)
}

const edit = (data) => {
    return post(BASE_URL + 'edit', data)
}

const one = (params) => {
    return get(BASE_URL + 'one/' + params.id)
}

const page = (data) => {
    return post(BASE_URL + 'page',data)
}

const del = (params) => {
    return get(BASE_URL + 'del/' + params.id)
}

const queryName = (params) => {
    return get(BASE_URL + 'query/' + params.name)
}

export {
    edit,  
    add,
    one,
    page,
    del,
    queryName
}