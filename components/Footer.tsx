const Footer = () => {
  const socialLinks = [
    {
      href: "https://in.linkedin.com/company/ecell-ietlucknow",
      img: "/link.svg",
      alt: "LinkedIn",
    },
    {
      href: "https://x.com/ecell_ietlko?lang=en",
      img: "/twit.svg",
      alt: "X",
    },
    {
      href: "https://www.instagram.com/ecell_iet_lko/",
      img: "/instag.svg",
      alt: "Instagram",
    },
  ];

  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96 pointer-events-none"></div>
      <div className="relative z-10 flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Designed & Developed by Shivansh
        </p>

        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={link.img} alt={link.alt} className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
