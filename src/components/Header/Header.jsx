import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import Notification from '../../assets/Icons/icon.svg';
import Flag from '../../assets/Icons/UKFlag.png';
import User from '../../assets/Icons/user.png';
import DropDown from '../../assets/Icons/More.svg'
import SearchIcon from '../../assets/Icons/search.svg'
import Lines from '../../assets/Icons/3lines.png'

function Header() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const searchableItems = [
        { title: 'About Us', path: '/' },
        { title: 'Subreddit Analyzer', path: '/subreddit' },
        { title: 'Posts Analyzer', path: '/posts' }
    ];

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleItemClick = (path) => {
        navigate(path);
        setSearchTerm('');
    };

    const filteredItems = searchTerm
    ? searchableItems.filter(item =>
        item.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
    : [];

    return (
        <header className="header">
            <div className="header__search">
                <img src={Lines} alt="3 lines" className='header__search-lines'></img>
                <div className="header__search-container">
                    <img
                        src={SearchIcon}
                        alt="Search Icon"
                        className="header__search-icon"
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="header__search-bar"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {filteredItems.length > 0 && (
                        <div className="header__search-results">
                            {filteredItems.map((item) => (
                                <div
                                    key={item.path}
                                    className="header__search-result-item"
                                    onClick={() => handleItemClick(item.path)}
                                >
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="header__icons">
                <div className="header__icon">
                    <img src={Notification} alt="Notifications" />
                </div>
                <div className="header__language">
                    <img src={Flag} alt="English" />
                    <span>English</span>
                    <span className="header__dropdown-icon">
                        <img src={DropDown} alt="Dropdown Icon" />
                    </span>
                </div>
                <div className="header__profile">
                    <img src={User} alt="Profile" className="header__profile-avatar" />
                    <div className="header__profile-details">
                        <span>Moni Roy</span>
                    </div>
                    <span className="header__dropdown-icon">
                        <img src={DropDown} alt="Dropdown Icon" />
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;

