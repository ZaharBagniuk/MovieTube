export interface Movie {
    etag: string,
    id: Id,
    kind: string,
    snippet: Snippet
}

type Id = {
    kind: string,
    videoId: string
}

type Snippet = {
    channelId: string,
    channelTitle: string,
    description: string,
    liveBroadcastContent: string,
    publishTime: string,
    publishedAt: string,
    title: string,
    thumbnails: {
        default: Thumbnail,
        high: Thumbnail,
        medium: Thumbnail
    }
}

type Thumbnail = {
    height: number,
    width: number,
    url: string
}
