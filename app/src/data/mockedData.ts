    // mockedData, in this format:
    /**
     * 
     * {
        "status": "success",
        "data": [
            {
                "_id": "6574cd3c848d5fc6705b5182",
                "title": "A SCANDAL IN BOHEMIA",
                "author": "Arthur Conan Doyle",
                "genre": "fiction",
                "link": "a_scandal_in_bohemia.jpeg",
                "bookID": "2",
                "numChapters": "3",
                "favorited": false
            },
            {
                "_id": "657a73ac47441f7e70cc1f96",
                "bookID": "1",
                "author": "Arthur Conan Doyle",
                "genre": "fiction",
                "link": "a_case_of_identity.jpg",
                "numChapters": "1",
                "title": "A CASE OF IDENTITY",
                "favorited": false
            },
            {
                "_id": "657a73bd47441f7e70cc5a87",
                "bookID": "3",
                "author": "Arthur Conan Doyle",
                "genre": "fiction",
                "link": "silver_blaze.jpeg",
                "numChapters": "1",
                "title": "SILVER BLAZE",
                "favorited": true
            },
            {
                "_id": "657a73ce47441f7e70cc9337",
                "bookID": "4",
                "author": "Arthur Conan Doyle",
                "genre": "nonfiction",
                "link": "the_adventure_of_the_beryl_coronet.jpeg",
                "numChapters": "1",
                "title": "THE ADVENTURE OF THE BERYL CORONET",
                "favorited": true
            },
            {
                "_id": "657a73da47441f7e70ccc160",
                "bookID": "5",
                "author": "Arthur Conan Doyle",
                "genre": "fiction",
                "link": "the_adventure_of_the_blue_carbuncle.jpeg",
                "numChapters": "1",
                "title": "THE ADVENTURE OF THE BLUE CARBUNCLE",
                "favorited": false
            },
            {
                "_id": "657a73e047441f7e70ccd505",
                "bookID": "6",
                "author": "Arthur Conan Doyle",
                "genre": "nonfiction",
                "link": "the_adventure_of_the_copper_beeches.jpeg",
                "numChapters": "1",
                "title": "THE ADVENTURE OF THE COPPER BEECHES",
                "favorited": true
            }
        ]
    }
    mockedData in the format above:
    */

    import { ChapterJson, ResponseType } from "../types/types";

    export const mockedData: ResponseType = {
    status: "success",
    data: [
        // Adding Lord of the Rings books
        {
        _id: "657a73f147441f7e70cce940",
        bookID: "1",
        author: "J.R.R. Tolkien",
        genre: "fiction",
        link: "1.jpg",
        numChapters: "22",
        title: "THE FELLOWSHIP OF THE RING",
        favorited: false,
        },
        {
        _id: "657a740047441f7e70ccf2d1",
        bookID: "2",
        author: "J.R.R. Tolkien",
        genre: "fiction",
        link: "2.jpg",
        numChapters: "22",
        title: "THE TWO TOWERS",
        favorited: false,
        },
        {
        _id: "657a741147441f7e70cd0c62",
        bookID: "3",
        author: "J.R.R. Tolkien",
        genre: "fiction",
        link: "3.jpg",
        numChapters: "31",
        title: "THE RETURN OF THE KING",
        favorited: false,
        },
    ],
    };

    export const mockChapterJson = {
    _id: "1234567890abcdef12345678",
    bookID: "2",
    author: "Emily Brontë",
    genre: "classic",
    link: "wuthering_heights.jpg",
    numChapters: "3",
    title: "WUTHERING HEIGHTS",
    favorited: true,
    comments: [
        {
        startIndex: 10,
        endIndex: 25,
        content: "mysterious mood",
        },
        {
        startIndex: 100,
        endIndex: 115,
        content: "gothic elements",
        },
        {
        startIndex: 200,
        endIndex: 215,
        content: "character depth",
        },
        {
        startIndex: 300,
        endIndex: 315,
        content: "descriptive landscape",
        },
    ],
    text: "The setting of Wuthering Heights is as much a character in the novel as the people themselves. The moors, the cold, and the winds are ever-present in the story, creating a sense of wildness and unpredictability. 'I have just returned from a visit to my landlord – the solitary neighbour that I shall be troubled with,' begins Lockwood, the narrator. 'This is certainly a beautiful country! In all England, I do not believe that I could have fixed on a situation so completely removed from the stir of society.' As he becomes more entangled in the lives of the Earnshaw and Linton families, the complex relationships and turbulent emotions mirror the untamed and brooding landscape.",
    };
