import { post, get } from "../index"

const BASE_URL = 'cms-help/'

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

const getCmsHelpsByCategoryId = (params) => {
    return get(BASE_URL + 'getCmsHelps/' + params.categoryId)
}

const query = (data) => {
    return post(BASE_URL + 'query', data)
}

const allCategory = () => {
    return post('cms-help-category/page',{
        current: 1,
        size: 200
    })
}

export {
    edit,  
    add,
    one,
    page,
    del,
    getCmsHelpsByCategoryId,
    query,
    allCategory
}