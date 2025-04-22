import React from "react";
import Icon from "../ui/Icon";
import Container from "../ui/Container";
function Footer() {
  return (
    <Container className="bg-lightPink">
      <footer className="flex flex-col  bg-lightPink items-center justify-center px-10 pt-8 pb-4">
        <div className="mb-8 footer sm:footer-horizontal text-base-content">
          <aside>
            <h1 className="ml-[10px] text-3xl font-semibold text-pink">
              Lumea
            </h1>
            <div className="flex items-center justify-center gap-4 cursor-pointer ">
              <Icon
                name="facebook"
                className="w-6 h-6 cursor-pointer hover:fill-pink"
              />
              <Icon
                name="youtube"
                className="w-6 h-6 cursor-pointer hover:fill-pink"
              />
              <Icon
                name="instagram"
                className="w-6 h-6 cursor-pointer hover:fill-pink "
              />
              <Icon
                name="tiktok"
                className="w-6 h-6 cursor-pointer hover:fill-pink"
              />
              <Icon
                name="snapchat"
                className="w-6 h-6 cursor-pointer hover:fill-pink"
              />
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
        </div>
        <h6>Developed By ❤️ FATMA</h6>
      </footer>
    </Container>
  );
}

export default Footer;
