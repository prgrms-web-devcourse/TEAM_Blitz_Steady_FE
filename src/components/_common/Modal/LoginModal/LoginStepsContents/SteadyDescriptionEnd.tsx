import useLoginStepsStore from "@/stores/loginSteps";
import Button, { buttonSize } from "@/components/_common/Button";
import { loginTextStyles } from "./SetNickname";

const SteadyDescriptionEnd = () => {
  const { setIncreaseSteps } = useLoginStepsStore();
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-evenly">
        <div className="flex flex-col items-center justify-evenly gap-10">
          <div className={`${loginTextStyles} leading-1000 text-center`}>
            <span className="text-st-primary">스테디</span> 참여를 위해
            <div className="w-full">리더가 설정한 신청서를 작성해 보세요!</div>
          </div>
        </div>
      </div>
      <Button
        className={`${buttonSize.md}  bg-st-primary text-st-white`}
        onClick={() => setIncreaseSteps()}
      >
        다음
      </Button>
    </>
  );
};

export default SteadyDescriptionEnd;
