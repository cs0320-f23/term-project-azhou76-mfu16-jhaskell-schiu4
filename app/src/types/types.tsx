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


export type BookType = {
      _id: string;
      bookID: string;
      author: string;
      genre: string;
      link: string; // URL or path to the book's image
      numChapters: string;
      title: string;
      favorited: boolean;
    };

    // Define the type for the response structure
export type ResponseType = {
      status: string;
      data: BookType[];
    };
    