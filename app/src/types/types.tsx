export type SelectedText = {
  text: string;
  needsCutoff: boolean;
};

export type ChapterJson = {
  author: string;
  bookID: string;
  comments:  Comment[];
  genre: string;
  numChapters: string;
  text: string;
  title: string;
    };

export type Comment = {
  startIndex: number | undefined;
  endIndex: number | undefined;
  content: string | undefined;
    };
    