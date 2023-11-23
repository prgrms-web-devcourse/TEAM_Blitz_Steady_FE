"use client";

import type { ReactNode } from "react";
import { Suspense, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/images/logo.svg";
import { UserModal } from "@/components/_common/Modal";
import UserItems from "@/components/_common/Modal/UserModal/UserItems";
import Spinner from "@/components/_common/Spinner";
import useApplicantListQuery from "@/hooks/query/useApplicantListQuery";

const selectedEffectStyle = "bg-st-skyblue-50 text-st-primary";
const normalEffectStyle = "hover:bg-st-gray-50";

const SteadyApplicantLayout = ({
  params,
  children,
}: {
  params: { steady_id: string };
  children: ReactNode;
}) => {
  const steadyId = params.steady_id;
  const [selectedItem, setSelectedItem] = useState(0);
  const { applicantListData, hasNextPage, fetchNextPage } =
    useApplicantListQuery({ steadyId });

  return (
    <>
      <div className="w-fit">
        <div className="flex h-850 w-250 flex-col items-center gap-15 overflow-y-auto overflow-x-hidden rounded-20 border-1 border-solid border-st-gray-100 p-20 scrollbar-hide">
          <InfiniteScroll
            hasMore={hasNextPage}
            loadMore={() => fetchNextPage()}
            useWindow={false}
          >
            {applicantListData.pages.map((page) =>
              page.content.map((user, id) => (
                <div key={user.userId}>
                  <div
                    className={`flex w-200 items-center gap-10 rounded-5 p-20 text-18 font-bold transition duration-100 ${
                      selectedItem === id
                        ? selectedEffectStyle
                        : normalEffectStyle
                    }`}
                    onClick={() => setSelectedItem(id)}
                  >
                    <UserModal
                      trigger={
                        <div>
                          <Image
                            className="cursor-pointer rounded-full border-1"
                            src={
                              `/${user.profileImage}`
                                ? `/${user.profileImage}`
                                : Logo
                            }
                            alt="유저 프로필 이미지"
                            width={50}
                            height={50}
                          />
                        </div>
                      }
                    >
                      <Suspense fallback={<Spinner size="medium" />}>
                        <UserItems userId={user.userId} />
                      </Suspense>
                    </UserModal>
                    <Link
                      href={`/steady/applicant/${steadyId}/${user.applicationId}`}
                      className="w-full"
                    >
                      <div>{user.nickname}</div>
                    </Link>
                  </div>
                </div>
              )),
            )}
          </InfiniteScroll>
        </div>
      </div>
      {children}
    </>
  );
};

export default SteadyApplicantLayout;