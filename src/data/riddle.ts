import riddleData from './Riddle.json'

export interface RiddleArrayType {
    id: string;
    keyword: string;
    riddle: string;
    answer: string;
}

export const RiddleArray: RiddleArrayType[] = riddleData as RiddleArrayType[]