import React from "react";
import { ReactComponent as Instagram } from "../../Assets/icons/instagram.svg";
import { ReactComponent as Snapchat } from "../../Assets/icons/snapchat.svg";
import { ReactComponent as Tiktok } from "../../Assets/icons//tiktok.svg";
import { ReactComponent as Facebook } from "../../Assets/icons/facebook.svg";
import { ReactComponent as Youtube } from "../../Assets/icons/youtube.svg";

const icons = {
    instagram: Instagram,
    snapchat: Snapchat,
    tiktok: Tiktok,
    facebook: Facebook,
    youtube: Youtube
  };

export default function Icon({ name, className }) {
  const SvgIcon = icons[name];
  return SvgIcon ? <SvgIcon className={className} /> : null;
}
