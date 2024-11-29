const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-7 bg-green text-white py-10 px-20 md:flex-row md:justify-between md:items-center">
      <div className="text-center md:text-left">
        <strong>WELLPULSE</strong>
        <p className="text-sm text-light-grey">
          Your ultimate tool for wellness. Track your habits, organize your
          schedule, and achieve your goals.
        </p>
      </div>
      <div className="text-center text-sm text-light-grey">
        <p>&copy; {new Date().getFullYear()} WellPulse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
