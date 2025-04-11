import { RiddleArray } from "@/data/riddle";

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};


export const toTitleCase = (str: string) => {
  return str
  .toLowerCase()
  .replace(/-/g, ' ') // Replace hyphens with spaces
  .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize each word
};
  export const getRiddleTotalKeyword = () => {
    const keywordArray = [...new Set(
  
      RiddleArray.map((item) => toTitleCase(item.keyword) 
    
    )
    )]
    return keywordArray;
  }