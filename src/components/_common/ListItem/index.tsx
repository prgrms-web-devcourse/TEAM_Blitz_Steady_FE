import clsx from "clsx";
import type { SteadyInfoType } from "@/app/page";
import Icon from "../Icon";

interface ListItemProps {
  object: SteadyInfoType[];
  className?: string;
  listType: "steady" | "form";
}

const ListItem = ({ className, object, listType }: ListItemProps) => {
  return (
    <div>
      {object.map((item, id) => (
        <div
          key={id}
          className={clsx(
            "flex h-140 cursor-pointer items-center justify-between px-40 py-50",
            listType === "steady" ? "w-1000" : "w-750",
            className,
          )}
        >
          <div className="text-black text-26 font-bold">{item.title}</div>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center gap-30">
              <div className="text-bold text-15 text-st-gray-100">
                생성일 {item.createdAt}
              </div>
              {item.isAdmin && (
                <>
                  {listType === "steady" ? (
                    <>
                      <Icon
                        name="gear"
                        size={30}
                        color="text-st-gray-200"
                      />
                      <Icon
                        name="trash"
                        size={30}
                        color="text-st-gray-200"
                      />
                    </>
                  ) : (
                    <>
                      <Icon
                        name="pencil"
                        size={30}
                        color="text-st-gray-200"
                      />
                      <Icon
                        name="trash"
                        size={30}
                        color="text-st-gray-200"
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListItem;