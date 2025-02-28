import React from "react";
import DesktopWindowsRoundedIcon from "@mui/icons-material/DesktopWindowsRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import DesktopMacRoundedIcon from "@mui/icons-material/DesktopMacRounded";
import DeviceUnknownRoundedIcon from "@mui/icons-material/DeviceUnknownRounded";
function Platform({ option }: { option: string }) {
  const styles = "absolute inset-0 m-auto text-secondary_color";
  const stylesInline = { fontSize: "30px" };
  if (option === "Windows")
    return (
      <DesktopWindowsRoundedIcon className={styles} style={stylesInline} />
    );
  if (option === "Android")
    return <PhoneAndroidRoundedIcon className={styles} style={stylesInline} />;
  if (option === "iOS")
    return <PhoneIphoneRoundedIcon className={styles} style={stylesInline} />;
  if (option === "MacOS")
    return <DesktopMacRoundedIcon className={styles} style={stylesInline} />;
  return <DeviceUnknownRoundedIcon />;
}

export default Platform;
