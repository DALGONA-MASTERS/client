interface Post {
    _id: string;
    author: string;
    content: string;
    likers: string[];
    likesCount: number;
    comments: {
        _id?: string;
        commenter: string;
        comment: string;
        postId: string;
    }[];
    createdAt: string;
}
interface Comment {
    commenter: string;
    comment: string;
    postId: string; // Assuming each comment is linked to a post
}
interface CommentUi {
    _id: string;
    commenter: string;
    comment: string;
}
interface CommentBodyEdit {
    _id: string;
    commenter: string;
    comment: string;
    postId: string
}

interface UiPost {
    _id: string;
    author: string;
    content: string;
    likers: string[];
    likesCount: number;
    comments: {
        _id: string;
        commenter: string;
        comment: string;
    }[];
    createdAt: string;
    showComments: boolean;
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
    Post, PostData, UpdatePostData, UiPost, Comment, CommentUi, CommentBodyEdit
}