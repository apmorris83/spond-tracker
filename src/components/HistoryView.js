import React,{Fragment,useState} from 'react';

import {filterData,getSections,getRowsBySection} from '../utils/utils';

const HistoryView = () => {
    const [filters,setFilters] = useState({section:'all',row:'all',month:'all',year:'all'});
    const dataToUse = filterData(filters);
    const total = dataToUse.reduce((acc,cur) => acc += cur.amount,0);
    const months = {0:'January',1:'February',2:'March',3:'April',4:'May',5:'June',6:'July',7:'August',8:'September',9:'October',10:'November',11:'December'};
    const handleChange = (ev,filter) => {
        if(filter === 'section'){ // always set rows to all on selecting a new section
            setFilters({...filters,[filter]:ev.target.value,row:'all'});
        } else if(filter === 'month' && ev.target.value !== 'all') { // month needs converting to a number
            setFilters({...filters,[filter]:Number(ev.target.value)});
        } else if(filter === 'year' && ev.target.value !== 'all') { // year needs converting to a number
            setFilters({...filters,[filter]:Number(ev.target.value)});
        } else {
            setFilters({...filters,[filter]:ev.target.value});
        }
    }
    return (
        <Fragment>
            <div>
                <select value={filters.section} onChange={ev => handleChange(ev,'section')}>
                    {['all',...getSections()].map(section => <option value={section}>{section}</option>)}
                </select>
                <select value={filters.row} onChange={ev => handleChange(ev,'row')}>
                    {['all',...getRowsBySection(filters.section)].map(row => <option value={row}>{row}</option>)}
                </select>
                <select value={filters.month} onChange={ev => handleChange(ev,'month')}>
                    {['all',...Object.keys(months)].map(row => <option value={row}>{row === 'all' ? 'all' : months[row]}</option>)}
                </select>
                <select value={filters.year} onChange={ev => handleChange(ev,'year')}>
                    {/* need a function to get years */}
                    {['all',2019,2018].map(row => <option value={row}>{row}</option>)} 
                </select>
                <span>Total: {total}</span>
            </div>
            {dataToUse.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>Section</th>
                            <th>Row</th>
                            <th>Month</th>
                            <th>Amount</th>
                            <th>Notes</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataToUse.map((ent,i) => {
                            return (
                                <tr key={`${i}-${ent.date}`}>
                                    <td>{ent.section}</td>
                                    <td>{ent.row}</td>
                                    <td>{new Date(ent.date).getMonth()}</td>
                                    <td>{ent.amount}</td>
                                    <td>{ent.note}</td>
                                    <td>{ent.date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            : <div>No results</div>}
        </Fragment>
    )
}

export default HistoryView;