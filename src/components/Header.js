import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to='/'><button>Table</button></Link>
            <Link to='history'><button>History</button></Link>
        </div>
    )
}

export default Header;