import { useEffect, useState } from "react";
import getSteadies from "@/services/steady/getSteadies";
import type { Steadies } from "@/services/types";
import Icon from "../_common/Icon";

interface PaginationProps {
  stack: string;
  position: string;
  mode: string;
  keyword: string;
  deadline: boolean;
  recruit: boolean;
  type: string;
  totalPost: number;
  page: number;
  like: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPost: React.Dispatch<React.SetStateAction<Steadies>>;
}

const Pagination = ({
  stack,
  position,
  mode,
  keyword,
  deadline,
  recruit,
  type,
  totalPost,
  page,
  like,
  setPage,
  setPost,
}: PaginationProps) => {
  const [currentPageArray, setCurrentPageArray] = useState<number[]>([]);
  const [totalPageArray, setTotalPageArray] = useState<number[][]>([]);
  const totalPage = Math.ceil(totalPost / 10);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(page / 5));
  }, [page]);

  useEffect(() => {
    setCurrentPageArray(totalPageArray[Math.floor(page / 5)]);
  }, [index]);

  useEffect(() => {
    if (totalPage) {
      const totalPageArray = Array(totalPage)
        .fill(1)
        .map((_, i) => i);
      const slicedPageArray = Array(Math.ceil(totalPage / 5))
        .fill(1)
        .map(() => totalPageArray.splice(0, 5));
      setTotalPageArray(slicedPageArray);
      setCurrentPageArray(slicedPageArray[0]);
    }
  }, [totalPage]);

  const handlePageSteadies = async (
    stack: string,
    position: string,
    mode: string,
    keyword: string,
    deadline: boolean,
    recruit: boolean,
    type: string,
    page: number,
    like: boolean,
  ) => {
    const data = await getSteadies(
      stack,
      position,
      mode,
      keyword,
      deadline,
      recruit,
      type,
      page.toString(),
      like,
    );
    setPost(data);
  };

  useEffect(() => {
    handlePageSteadies(
      stack,
      position,
      mode,
      keyword,
      deadline,
      recruit,
      type,
      page,
      like,
    );
  }, [page]);

  return (
    <div className="flex">
      <button
        onClick={() => {
          setPage(0);
        }}
        disabled={page === 0}
        className="flex h-35 w-35 items-center justify-center rounded-15 text-center font-bold shadow-md enabled:hover:bg-st-primary enabled:hover:text-st-white disabled:cursor-not-allowed disabled:opacity-20"
      >
        <Icon
          name="double-arrow-left"
          size={20}
          color="black"
        />
      </button>
      <button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 0}
        className="flex h-35 w-35 items-center justify-center rounded-15 text-center font-bold shadow-md enabled:hover:bg-st-primary enabled:hover:text-st-white disabled:cursor-not-allowed disabled:opacity-20"
      >
        <Icon
          name="chevron-left"
          size={20}
          color="black"
        />
      </button>
      <div>
        {currentPageArray?.map((i) => {
          return (
            <button
              key={i + 1}
              className={`${
                page === i && "bg-st-primary text-st-white"
              } h-35 w-35 rounded-15 text-center font-bold shadow-md hover:bg-st-primary hover:text-st-white`}
              onClick={() => {
                setPage(i);
              }}
              aria-current={page === i + 1 ? "page" : undefined}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={page === totalPage - 1}
        className="flex h-35 w-35 items-center justify-center rounded-15 text-center font-bold shadow-md enabled:hover:bg-st-primary enabled:hover:text-st-white disabled:cursor-not-allowed disabled:opacity-20"
      >
        <Icon
          name="chevron-right"
          size={20}
          color="black"
        />
      </button>
      <button
        onClick={() => {
          setPage(totalPage - 1);
        }}
        disabled={page === totalPage - 1}
        className="flex h-35 w-35 items-center justify-center rounded-15 text-center font-bold shadow-md enabled:hover:bg-st-primary enabled:hover:text-st-white disabled:cursor-not-allowed disabled:opacity-20"
      >
        <Icon
          name="double-arrow-right"
          size={20}
          color="black"
        />
      </button>
    </div>
  );
};

export default Pagination;
