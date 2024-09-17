import Image from 'next/image';
import five_crowns_logo from '../app/public/five-crowns-logo.jpg';

const Logo = () => {
  return (
    <div>
      <Image src={five_crowns_logo} alt="five_crowns_logo" width={300} height={100} />
    </div>
  );
};

export default Logo;
