"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox, TextArea } from "@radix-ui/themes";
import { useSuspenseQuery } from "@tanstack/react-query";
import createReview from "@/services/review/createReview";
import getReviewCards from "@/services/review/getReviewCards";
import getReviewSteadyInfo from "@/services/review/getReviewSteadyInfo";
import type { CreateReviewType } from "@/services/types";
import Button, { buttonSize } from "@/components/_common/Button";
import { ReviewCardKey, ReviewSteadyKey } from "@/constants/queryKeys";
import turtle from "../../../../../../public/images/logo.svg";

const ReviewPage = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const pathname = usePathname();
  const steadyId = pathname.split("/")[3];
  const [review, setReview] = useState("");
  const [cardArray, setCardArray] = useState<number[]>([]);
  const [completedUser, setCompletedUser] = useState<CreateReviewType[]>([]);
  const { toast } = useToast();

  const { data } = useSuspenseQuery({
    queryKey: ReviewSteadyKey,
    queryFn: () => getReviewSteadyInfo(steadyId),
  });

  const { data: reviewCards } = useSuspenseQuery({
    queryKey: ReviewCardKey,
    queryFn: () => getReviewCards(),
  });

  useEffect(() => {
    if (data && data.reviewees[0]) {
      setSelectedUser(data.reviewees[0].userId);
    }
  }, []);

  const handleReviewSubmit = async () => {
    if (cardArray.length <= 0) {
      toast({
        description: "카드를 선택해주세요.",
        variant: "red",
      });
      return;
    }
    const json = {
      revieweeId: selectedUser,
      cardsId: cardArray,
      comment: review,
    };
    const response = await createReview(steadyId, json);
    if (response) {
      toast({
        description: "리뷰가 제출되었습니다.",
        variant: "green",
      });
      setCompletedUser((prevArray) => [...prevArray, json]);
      setReview("");
      setCardArray([]);
    }
  };

  const handleCardArray = (cardId: number) => {
    if (cardArray.indexOf(cardId) === -1) {
      setCardArray((prevArray) => [...prevArray, cardId]);
    } else {
      setCardArray((prevArray) => prevArray.filter((item) => item !== cardId));
    }
  };

  const handleSelectedUser = (userId: number) => {
    if (
      completedUser.some((item) => {
        if (item.revieweeId === userId) {
          setCardArray(item.cardsId);
          setReview(item.comment);
          return true;
        }
      })
    ) {
      toast({
        description: "리뷰가 완료된 사용자입니다.",
        variant: "red",
      });
      return;
    }
    setSelectedUser(userId);
    setReview("");
    setCardArray([]);
  };

  return (
    <div className="my-30 flex flex-col gap-20">
      <div className="flex items-center justify-between">
        <div className="text-30 font-bold">{data?.steady.name} 리뷰</div>
        <Link href={`/steady/detail/${steadyId}`}>
          <Button
            className={`${buttonSize.sm} items-center justify-center bg-st-primary text-st-white`}
          >
            리뷰 완료
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-30">
        <div className="h-5 w-1000 bg-st-gray-400"></div>
        <div className="flex h-200 w-800 flex-wrap items-center justify-center rounded-10 px-30 py-20 text-center text-30 font-bold shadow-md">
          <div className="flex w-1/2 items-center text-20">
            <div className="flex h-40 w-100 items-center justify-center rounded-20 bg-st-skyblue-50 text-15 font-bold shadow-md">
              스테디 구분
            </div>
            <div className="flex-1 text-17">
              {data?.steady.steadyType === "STUDY" ? "스터디" : "프로젝트"}
            </div>
          </div>
          <div className="flex w-1/2 items-center text-20">
            <div className="flex h-40 w-100 items-center justify-center rounded-20 bg-st-skyblue-50 text-15 font-bold shadow-md">
              진행 방식
            </div>
            <div className="flex-1 text-17">
              {data?.steady.steadyMode === "ONLINE"
                ? "온라인"
                : data?.steady.steadyMode === "OFFLINE"
                ? "오프라인"
                : "온/오프라인"}
            </div>
          </div>
          <div className="flex w-1/2 items-center text-20">
            <div className="flex h-40 w-100 items-center justify-center rounded-20 bg-st-skyblue-50 text-15 font-bold shadow-md">
              진행 기간
            </div>
            <div className="flex-1 text-17">
              {data?.steady.participatedAt} ~ {data?.steady.finishedAt}
            </div>
          </div>
          <div className="flex w-1/2 items-center text-20">
            <div className="flex h-40 w-100 items-center justify-center rounded-20 bg-st-skyblue-50 text-15 font-bold shadow-md">
              진행 인원
            </div>
            <div className="flex-1 text-17">{data?.steady.participants}명</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-50">
          {data?.reviewees.map((participant) => (
            <div
              key={participant.userId}
              className={`${
                selectedUser !== participant.userId && "opacity-30"
              } ${
                completedUser.some(
                  (item) => item.revieweeId === participant.userId,
                ) && "border border-2 border-st-green"
              } flex cursor-pointer flex-col items-center justify-center rounded-md text-20 font-bold`}
              onClick={() => handleSelectedUser(participant.userId)}
            >
              <Image
                className="rounded-md"
                src={turtle}
                alt="profile image"
                width={70}
                height={100}
              />
              {participant.nickname}
            </div>
          ))}
        </div>
        <div className="h-3 w-1000 bg-st-gray-200"></div>
        <div className="flex w-full items-center justify-center">
          <div className="flex h-290 w-600 flex-col justify-center gap-15">
            {reviewCards.cards.map((card) => (
              <div
                key={card.cardId}
                className="flex h-50 items-center justify-between"
              >
                <Checkbox
                  disabled={completedUser.some(
                    (item) => item.revieweeId === selectedUser,
                  )}
                  size={"3"}
                  color="green"
                  className={`${
                    cardArray.indexOf(card.cardId) !== -1
                      ? "bg-st-green"
                      : "bg-st-white"
                  } rounded-5 border`}
                  onClick={() => handleCardArray(card.cardId)}
                />
                <Image
                  src={card.imageUrl}
                  width={35}
                  height={35}
                  alt="card_image"
                />
                <div className="w-430 text-20 font-bold">{card.content}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-5 w-1000 bg-st-gray-400"></div>
      </div>
      <div className="mt-20 flex flex-col justify-center gap-10">
        <div className="text-25 font-bold">한 줄 평 남기기</div>
        <TextArea
          disabled={completedUser.some(
            (item) => item.revieweeId === selectedUser,
          )}
          className="h-100 w-1000 outline-none"
          size={"3"}
          placeholder="팀원들에게 한 줄 평을 남겨보세요."
          value={review}
          color="gray"
          onChange={(event) => setReview(event.target.value)}
        />
        <div className="flex items-center justify-end">
          <Button
            disabled={completedUser.some(
              (item) => item.revieweeId === selectedUser,
            )}
            onClick={() => handleReviewSubmit()}
            className={`${buttonSize.sm} items-center justify-center bg-st-primary text-st-white`}
          >
            제출
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
