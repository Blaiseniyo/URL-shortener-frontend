import { Link } from 'react-router-dom';

const Log: React.FC = () => {

    return (
    //     <Link to="/" className="flex items-center">
    //     <span className="text-2xl font-bold text-cyan-400">URL</span>
    //     <span className="text-2xl font-bold text-white">Short</span>
    //   </Link>
        <Link to="/" className="flex justify-center">
            <img src="/bitly_logo.svg" alt="URLShort" className="h-12 w-auto" />
        </Link>
    );
};

export default Log;
