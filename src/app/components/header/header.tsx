import Image from "next/image";
import Logo from "../../../assets/aw-logo-blu.svg";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";

interface HeaderProps {
    onSearch: (query: string) => void; // Define a prop type for the search function
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value); // Update local state with input value
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(query); // Call the onSearch function with the query when Enter is pressed
        }
    };

    return (
        <div className="flex flex-col w-full m-auto border shadow-md">
            <div className="flex flex-col px-4 sm:px-8 py-4 justify-between w-full">
                <div className="flex flex-col sm:flex-row w-full justify-between items-center">
                    <div className="relative w-32 flex items-center">
                        <Image src={Logo} alt="logo" className="flex" />
                        <span className="text-slate-600 right-0 flex items-end p-0 m-0">News</span>
                    </div>
                    <div className="flex w-full sm:w-4/12 relative border rounded-sm px-2 py-2 items-center mt-2 sm:mt-0">
                        <input
                            type="input"
                            placeholder="Search for News here..."
                            className="flex px-1 w-full focus:ring-0 outline-none border-none text-sm text-slate-600"
                            value={query} // Set input value to local query state
                            onChange={handleChange} // Update local state on change
                            onKeyDown={handleKeyDown} // Trigger search on key down (Enter key)
                        />
                        <IoSearchOutline className="absolute right-0 m-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
