import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import { useGlobalState } from "../context/useStateContext";

export const Header = ({
  enableNotification,
}: {
  enableNotification: () => void;
}) => {
  const { isNotificationEnabled } = useGlobalState();
  return (
    <div className="absolute top-[2%] right-[2%] flex gap-2 z-[2]">
      <button
        type="button"
        className={`p-[0.4rem]
        } rounded-full h-fit flex text-center justify-center transition-all duration-300`}
        onClick={enableNotification}
      >
        {isNotificationEnabled ? (
          <NotificationsIcon
            style={{ fontSize: "1.5rem" }}
            className={"text-secondary_color"}
          />
        ) : (
          <NotificationsOffIcon
            style={{ fontSize: "1.5rem" }}
            className={"text-secondary_color"}
          />
        )}
      </button>
    </div>
  );
};
