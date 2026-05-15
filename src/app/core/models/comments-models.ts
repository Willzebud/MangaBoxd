export interface CommentBody {
    content: string;
}

export interface CommentResponse {
    id: string,
    mangaListId: string,
    author: {
        id: string,
        firstname: string,
        lastname: string,
    },
    content: string,
    createdAt: string
}