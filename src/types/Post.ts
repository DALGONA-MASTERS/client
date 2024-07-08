interface Post {
    author: string,
    content: string,
    comments: [{
        commenter: string,

        comment: string,

        createdAt: string
    },]


}
interface PostData {
    author: string,
    content: string,
}
interface UpdatePostData {
    _id: string,
    content: string,
}

export type {
    Post, PostData, UpdatePostData
}