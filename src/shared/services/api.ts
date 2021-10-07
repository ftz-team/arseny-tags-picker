import { TagInterface } from "../../models/TagInterface";

export const getTags  = async () : Promise<TagInterface[]> => {
    const tags = await (await fetch("http://80.78.246.198:8000/api/get_tags_list/")).json()
    return tags
}

export const save_tags = async (tags: TagInterface[], uid: number) => {

    return fetch("http://80.78.246.198:8000/api/select_tags/", {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: 425974638,
            selected_tags : tags.map(tag=>tag.id)
        })
    })
}