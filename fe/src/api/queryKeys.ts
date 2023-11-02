import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { postLogin } from "./auth/client";
import { OAuthLoginParams } from "./auth/type";
import { getBookList, getBookSearchResult } from "./book/client";
import { getBookClubList } from "./bookClub/client";
import { BookClubStatus } from "./bookClub/type";
import { getMember } from "./member/client";

export const queryKeys = createQueryKeyStore({
  members: {
    info: () => ({
      queryKey: ["getMember"],
      queryFn: getMember,
    }),
  },
  auth: {
    login: ({ provider, authCode }: OAuthLoginParams) => ({
      queryKey: ["postLogin"],
      queryFn: () => postLogin({ provider, authCode }),
    }),
  },
  books: {
    search: (searchWord: string) => ({
      queryKey: ["getBookSearchResult", searchWord],
      queryFn: () => getBookSearchResult(searchWord),
    }),
    list: ({ page, size }: { page: number; size: number }) => ({
      queryKey: ["getBookList", { page, size }],
      queryFn: () => getBookList({ page, size }),
    }),
  },
  chapters: {
    list: ({ page, size }: { page: number; size: number }) => ({
      queryKey: ["getChapterList", { page, size }],
      // queryFn: () => getChapterList({ page, size }),
    }),
  },
  bookClub: {
    list: (option?: BookClubStatus) => ({
      queryKey: ["getBookClubList", option],
      queryFn: () => getBookClubList(option),
    }),
    join: (verificationCode?: string) => ({
      queryKey: ["postJoinBookClub", verificationCode],
    }),
  },
});
