import riddleContentData from './RiddleContent.json'

export interface riddleContentType {
    [key: string]: {
        title: string;
        heroText: string;
        metaDescription: string;
    }
}

export const riddleContent: riddleContentType = riddleContentData as riddleContentType