import React from "react";
import Icon from "../common/Icon";
function Footer() {
  return (
    <footer className="p-10 bg-white footer sm:footer-horizontal text-base-content">
      <aside>
        <h1 className="text-3xl text-pink text-bold">luva</h1>
        <div className="flex items-center justify-center gap-4 cursor-pointer ">
          <Icon name="facebook" className="w-8 h-8 cursor-pointer hover:fill-pink" />
          <Icon name="youtube" className="w-6 h-6 cursor-pointer hover:fill-pink" />
          <Icon name="instagram" className="w-6 h-6 cursor-pointer hover:fill-pink " />
          <Icon name="tiktok" className="w-6 h-6 cursor-pointer hover:fill-pink" />
          <Icon name="snapchat" className="w-6 h-6 cursor-pointer hover:fill-pink" />
        </div>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Contact Us</h6>
        <a className="link link-hover">Find My Order</a>
        <a className="link link-hover">Popular FAQs</a>
        <a className="link link-hover">Shipping & Returns</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
}

export default Footer;
