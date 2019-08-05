import React,{useState} from 'react';
import ReactDOM from 'react-dom';

import TableDisplay from './TableDisplay';
import Menu from './Menu';

const App = () => {
    const [filters,setFilters] = useState({section:'all',row:'all',month:'all'});
    const data = [
        {
            value:'food',
            name:'Food',
            rows:[
                {
                    value:'groceries',
                    name:'Groceries',
                    history:[
                        {month:0,amount:10.67,note:"B&M",date:"2019-01-01T15:37:19.842Z"},
                        {month:1,amount:36.70,note:"Tesco",date:"2019-01-01T15:37:19.842Z"},
                        {month:1,amount:20.99,note:"Aldi",date:"2019-01-01T15:37:19.842Z"},
                        {month:2,amount:23.46,note:"Aldi",date:"2019-01-01T15:37:19.842Z"}
                    ]
                },
                {
                    value:'restaurants',
                    name:'Restaurants',
                    history:[
                        {
                            month:0,amount:30,note:"Queens",date:"2019-02-01T15:37:19.842Z"
                        }
                    ]
                }
            ]
        },
        {
            value:'personal',
            name:'Personal',
            rows:[
                {
                    value:'squash',
                    name:'Squash',
                    history:[
                        {
                            month:0,amount:2,note:"Light money",date:"2019-01-01T15:37:19.842Z"
                        },
                        {
                            month:0,amount:2,note:"Court booking",date:"2019-01-01T15:37:19.842Z"
                        },
                        {
                            month:1,amount:4,note:"Court booking and light",date:"2019-01-01T15:37:19.842Z"
                        },
                    ]
                },
                {
                    value:'beer',
                    name:'Beer',
                    history:[
                        {
                            month:0,amount:50,note:"Pub crawl",date:"2019-02-01T15:37:19.842Z"
                        }
                    ]
                }
            ]
        }
    ]
    const filteredBySection = () => {
        return data.filter(section => filters.section === 'all' ? true : section.value === filters.section)
    }
    return (
        <div>
            <Menu 
                data={data}
                filters={filters}
                setFilters={setFilters}/>
            <TableDisplay data={filteredBySection(data)} filters={filters}/>
        </div>
    )
};

ReactDOM.render(<App/>,document.getElementById('root'));