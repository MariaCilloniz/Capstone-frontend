import React from 'react'
import { Link, NavLink } from "react-router-dom";
import './Sidebar.scss';
import Logo from '../../assets/Icons/ReddiLogoWeb.png'
import AuditIcon from '../../assets/Icons/auditicon.png'
import AboutUsIcon from "../../assets/Icons/aboutus.png"
import FavoritesIcon from "../../assets/Icons/favorites.png"
import InboxIcon from "../../assets/Icons/inbox.png"
import RankingIcon from "../../assets/Icons/ranking.png"
import SubredditIcon from "../../assets/Icons/subredditanalyzer.png"
import PostsIcon from "../../assets/Icons/posts.png"
import ContactIcon from "../../assets/Icons/contact.png"
import SettingsIcon from "../../assets/Icons/settings.png"
import LogoutIcon from "../../assets/Icons/off.png"

function Sidebar() {
    return (
        <aside className="sidebar">
            <Link to="/" className="sidebar__logo">
                <img src={Logo} alt="ReddiAudiTool Logo" />
            </Link>
            <NavLink to="/subreddit" className="sidebar__audit">
                <img src={AuditIcon} alt="Audit Icon" className="sidebar__audit-icon" />
                <span>AUDIT</span>
            </NavLink>
            <div className="sidebar__menu">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `sidebar__menu-item ${isActive ? 'sidebar__menu-item--active' : ''}`
                    }
                >
                    <div className="sidebar__menu-icon">
                        <img src={AboutUsIcon} alt="About Us Icon" />
                    </div>
                    <span>About Us</span>
                </NavLink>
                <div className="sidebar__menu-item">
                    <div className="sidebar__menu-icon">
                        <img src={FavoritesIcon} alt="Favorites Icon" />
                    </div>
                    <span>Favorites</span>
                </div>
                <div className="sidebar__menu-item">
                    <div className="sidebar__menu-icon">
                        <img src={InboxIcon} alt="Inbox Icon" />
                    </div>
                    <span>Compare</span>
                </div>
                <div className="sidebar__menu-item">
                    <div className="sidebar__menu-icon">
                        <img src={RankingIcon} alt="Ranking Icon" />
                    </div>
                    <span>Ranking</span>
                </div>
            </div>
            <div className="sidebar__services">
                <div className="sidebar__services-title">SERVICES</div>
                <NavLink
                    to="/subreddit"
                    className={({ isActive }) =>
                        `sidebar__menu-item ${isActive ? 'sidebar__menu-item--active' : ''}`
                    }
                >
                    <div className="sidebar__menu-icon">
                        <img src={SubredditIcon} alt="Subreddit Analyzer Icon" />
                    </div>
                    <span>Subreddit Analyzer</span>
                </NavLink>
                <NavLink
                    to="/posts"
                    className={({ isActive }) =>
                        `sidebar__menu-item ${isActive ? 'sidebar__menu-item--active' : ''}`
                    }
                >
                    <div className="sidebar__menu-icon">
                        <img src={PostsIcon} alt="Posts Analyzer Icon" />
                    </div>
                    <span>Posts Analyzer</span>
                </NavLink>
                <div className="sidebar__menu-item">
                    <div className="sidebar__menu-icon">
                        <img src={ContactIcon} alt="Contact Icon" />
                    </div>
                    <span>Contact</span>
                </div>
            </div>
            <div className="sidebar__footer">
                <div className="sidebar__menu-item">
                    <div className="sidebar__menu-icon">
                        <img src={SettingsIcon} alt="Settings Icon" />
                    </div>
                    <span>Settings</span>
                </div>
                <div className="sidebar__menu-item">
                    <div className="sidebar__menu-icon">
                        <img src={LogoutIcon} alt="Logout Icon" />
                    </div>
                    <span>Logout</span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar
