import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  inputName:
    | "search-input"
    | "name-input"
    | "steady-title-input"
    | "title-input"
    | "tag-input"
    | "introduce-input"
    | "steady-bio-input";
  initialValue?: string;
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: string) => void;
}

const Input = ({
  inputName,
  initialValue,
  onValueChange,
  ...props
}: InputProps) => {
  let input;

  switch (inputName) {
    case "search-input":
      input = (
        <input
          className="bg-input-bg xs:350 h-40 w-full rounded-12 border-3 border-st-gray-100 px-10 py-20 text-center text-20 font-bold outline-none transition-all duration-300 focus:border-st-primary sm:w-500 md:w-700"
          type="text"
          placeholder="검색어를 입력해주세요."
          {...props}
        />
      );
      break;
    case "name-input":
      input = (
        <div>
          <input
            className="max-mobile:w-full h-55 w-400 items-center rounded-12 border-2 border-solid border-st-gray-100 pl-5 pr-5 text-center text-lg outline-none"
            type="text"
            defaultValue={initialValue}
            placeholder="닉네임을 입력해주세요."
            onChange={(event) => {
              onValueChange?.(event.target.value);
            }}
            {...props}
          />
        </div>
      );
      break;
    case "steady-title-input":
      input = (
        <div>
          <input
            className="h-60 w-1000 pl-5 pr-5 text-3xl font-bold outline-none"
            type="text"
            defaultValue={initialValue}
            placeholder="스테디명"
            onChange={(event) => {
              onValueChange?.(event.target.value);
            }}
          />
        </div>
      );
      break;
    case "steady-bio-input":
      input = (
        <div>
          <input
            className="h-30 w-1000 pl-5 pr-5 text-2xl font-bold outline-none"
            type="text"
            defaultValue={initialValue}
            placeholder="스테디 한 줄 소개"
            onChange={(event) => {
              onValueChange?.(event.target.value);
            }}
          />
        </div>
      );
      break;
    case "title-input":
      input = (
        <div>
          <input
            className="h-60 w-1000 pl-5 pr-5 text-3xl font-bold outline-none"
            type="text"
            defaultValue={initialValue}
            placeholder="제목을 입력해주세요."
            onChange={(event) => {
              onValueChange?.(event.target.value);
            }}
          />
        </div>
      );
      break;
    case "tag-input":
      input = (
        <div>
          <input
            className="h-25 w-250 pl-5 pr-5 text-lg outline-none"
            type="text"
            defaultValue={initialValue}
            placeholder="태그를 설정하세요 (최대 5개)"
          />
        </div>
      );
      break;
    case "introduce-input":
      input = (
        <div className="flex h-64 items-center justify-center rounded-12 border-2 border-solid border-st-gray-100 p-10 outline-none md:w-1/2 xl:w-620">
          <input
            className="h-60 w-full rounded-12 p-5 text-xl font-bold outline-none"
            type="text"
            defaultValue={initialValue}
            placeholder="한 줄 소개로 자신을 표현해 주세요!"
            onChange={(event) => {
              onValueChange?.(event.target.value);
            }}
            {...props}
          />
        </div>
      );
      break;
    default:
      input = "";
  }

  return <div>{input}</div>;
};

export default Input;
