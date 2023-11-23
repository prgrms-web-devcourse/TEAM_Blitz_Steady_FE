"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import changeReviewStatus from "@/services/review/changeReviewStatus";
import getMyReviews from "@/services/review/getMyReviews";
import Icon from "@/components/_common/Icon";
import { SingleSelector } from "@/components/_common/Selector";
import { subMyPageTextStyles } from "@/constants/commonStyle";
import { getMyReviewKey } from "@/constants/queryKeys";

const MyReviewsPage = () => {
  const { data: myReviewData } = useSuspenseQuery({
    queryKey: getMyReviewKey,
    queryFn: () => getMyReviews(),
    staleTime: 10000,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const selectedReviews = myReviewData.reviews.find(
    (review) => review.steadyId === Number(selectedId),
  );

  const handlePublicReview = async (reviewId: number) => {
    await changeReviewStatus(reviewId.toString());
    queryClient.invalidateQueries({ queryKey: getMyReviewKey });
  };

  return (
    <div className="flex h-full w-fit flex-col gap-100">
      <div className="text-30 font-bold">내가 받은 리뷰</div>
      <div className={cn("flex flex-col gap-30")}>
        <div className={cn(subMyPageTextStyles.title)}>받은 카드</div>
        <div
          className={cn(
            "flex h-116 w-718 items-center justify-evenly rounded-6 border-2 border-st-gray-100 px-30 py-20",
          )}
        >
          {myReviewData.userCards.map((card) => (
            <div
              key={card.cardId}
              className={cn(
                subMyPageTextStyles.content,
                "flex h-full flex-col items-center justify-center gap-5",
              )}
            >
              <Image
                src={`/${card.imageUrl}`}
                alt="카드 이미지"
                width={80}
                height={80}
              />
              <div className={cn(subMyPageTextStyles.content)}>
                {`( ${card.count} )`}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cn("flex w-718 flex-col gap-30")}>
        <div className={cn(subMyPageTextStyles.title)}>한 줄 평</div>
        <SingleSelector
          items={myReviewData.reviews.map((review) => ({
            value: review.steadyId.toString(),
            label: review.steadyName,
          }))}
          initialLabel="전체"
          onSelectedChange={(value) => setSelectedId(value)}
          className="h-60"
        />
        <div
          className={`${
            selectedReviews
              ? "border-2 border-st-gray-100"
              : "items-center justify-center"
          } flex h-230 flex-col gap-20 overflow-auto px-10 py-5`}
        >
          {selectedReviews &&
            selectedReviews.reviews.map((review) => (
              <div
                key={review.reviewId}
                className="flex items-center justify-between"
              >
                <div className="text-ellipsis text-15 font-bold">
                  {review.comment}
                </div>
                <button onClick={() => handlePublicReview(review.reviewId)}>
                  {review.isPublic ? (
                    <Icon
                      name="eye"
                      size={25}
                      color="text-black"
                    />
                  ) : (
                    <Icon
                      name="eye-none"
                      size={25}
                      color="text-black"
                    />
                  )}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyReviewsPage;
