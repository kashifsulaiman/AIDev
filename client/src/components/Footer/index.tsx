import FooterCopyright from './FooterCopyright';
import FooterInfo from './FooterInfo';
import FooterMenu from './FooterMenu';

const Footer = () => {
  return (
    <div className="relative bg-[#111114] px-5 text-white 2xl:px-0">
      <div className="mx-auto max-w-[1327px]">
        <FooterInfo />
        <FooterMenu />
        <FooterCopyright />
      </div>
    </div>
  );
};

export default Footer;
