import React from 'react';

const Menu = ({data,filters,setFilters}) => {
    const allOption = {value:'all',text:'All'};
    const setSectionFilter = (value) => {
        return setFilters(prevState => {
            return {...prevState,section:value,row:'all'};
        })
    }
    const setRowFilter = (value) => {
        return setFilters(prevState => {
            return {...prevState,row:value};
        })
    }
    const setMonthFilter = (value) => {
        return setFilters(prevState => {
            return {...prevState,month:value};
        })
    }
    const renderSelectedSection = () => {
        const sections = data.map(section => {return {value:section.value,text:section.name}});
        return (
            <label className="ui label">
                Section
                <select className="ui item" value={filters.section} onChange={(e) => setSectionFilter(e.target.value)}>
                    {[allOption,...sections].map((option,i) => <option value={option.value} key={i}>{option.text}</option>)}
                </select>
            </label>
        )
    }
    const renderSelectedRow = () => {
        const rows = filters.section !== 'all' ? data.filter(section => section.value === filters.section)[0].rows.map(row => {return {value:row.value,text:row.name}}) : [];
        return (
            <label className="ui label">
                Row
                <select className="ui item" value={filters.row} onChange={(e) => setRowFilter(e.target.value)}>
                    {[allOption,...rows].map((option,i) => <option value={option.value} key={i}>{option.text}</option>)}
                </select>
            </label>
        )
    }
    const renderSelectedMonth = () => {
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((month,i) => {return {value:i,text:month}});
        return (
            <label className="ui label">
                Month
                <select className="ui item" value={filters.month} onChange={(e) => setMonthFilter(e.target.value)}>
                    {[allOption,...months].map((month,i) => <option value={month.value} key={i}>{month.text}</option>)}
                </select>
            </label>
        )
    }
    return (
        <div className="ui menu">
            <div className="ui container">
                {renderSelectedSection()}
                {renderSelectedRow()}
                {renderSelectedMonth()}
            </div>
        </div>
    )
}

export default Menu