import React from 'react';

const TableDisplay = ({data,filters}) => {
    return (
        <div className="ui container">
            {data.map((section,i) => {
                return (
                    <div className="ui item" key={i}>
                        <h1>{section.name}</h1>
                        {section.rows.map((row,j) => {
                            return filters.row === 'all' || row.value === filters.row ? 
                                <div key={j}>
                                    <h3>{row.name}</h3>
                                    {row.history.map((ent,k) => {
                                        return filters.month === 'all' || ent.month === Number(filters.month) ?
                                            <p key={k}>{ent.month}</p> 
                                        : null
                                    })}
                                </div>
                             : null
                        })}
                    </div>
                ) 
            })}
        </div>
    )
}

export default TableDisplay;