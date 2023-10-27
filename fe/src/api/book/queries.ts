import { queryKeys } from "@api/queryKeys";
import { MESSAGE } from "@constant/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { postNewBook } from "./client";
import { NewBookBody } from "./type";

export const useGetBookSearchResult = (searchWord: string) => {
  const { data: bookSearchResult } = useQuery(
    queryKeys.books.search(searchWord)
  );

  return { bookSearchResult };
};

export const usePostNewBook = ({
  onSuccessCallback,
}: {
  onSuccessCallback: (bookId: number) => void;
}) => {
  const { mutate } = useMutation({
    mutationFn: postNewBook,
  });

  const onPostNewBook = (newBookBody: NewBookBody) => {
    mutate(newBookBody, {
      onSuccess: ({ createdBookId }) => {
        enqueueSnackbar(MESSAGE.NEW_BOOK_SUCCESS, {
          variant: "success",
        });
        onSuccessCallback(createdBookId);
      },
      onError: () => {
        enqueueSnackbar(MESSAGE.NEW_BOOK_ERROR, {
          variant: "error",
        });
      },
    });
  };

  return { onPostNewBook };
};

export const useGetBooks = ({ page, size }: { page: number; size: number }) => {
  const {
    data: books,
    isLoading,
    isSuccess,
    isError,
  } = useQuery(queryKeys.books.list({ page, size }));

  return { books, isLoading, isSuccess, isError };
};
