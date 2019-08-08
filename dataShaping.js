const data = [ // app data structure
    {section:'food',row:'groceries',amount:13.42,note:'Aldi',date:'2019-08-05T18:38:17.792Z'},
    {section:'food',row:'groceries',amount:26.7,note:'B&M',date:'2019-08-05T18:38:17.792Z'},
    {section:'food',row:'restaurants',amount:26.7,note:'Lowes Arms',date:'2019-01-05T18:38:17.792Z'},
    {section:'personal',row:'squash',amount:1.5,note:'Court',date:'2019-07-05T18:38:17.792Z'},
    {section:'personal',row:'squash',amount:2,note:'Light money',date:'2019-07-05T18:38:17.792Z'},
    {section:'blackRio',row:'petrol',amount:35.01,note:'Asda',date:'2019-07-05T18:38:17.792Z'},
];
const oldHistory = '[{"section":"home","row":"mortgageOverPayment","month":0,"amount":400,"note":"","date":"2019-01-01T15:37:19.842Z"},{"section":"food","row":"shopping","month":0,"amount":7.7,"note":"Asda","date":"2019-01-01T15:37:20.842Z"},{"section":"personal","row":"squash","month":0,"amount":44.47,"note":"Artengo SR 960 racket and sweatbands","date":"2019-01-01T15:45:20.465Z"}]';
const getUniqueBy = (arr,val) => { // helper function
    return arr.reduce((acc,cur) => {
        if(acc.indexOf(cur[val]) < 0) acc.push(cur[val]);
        return acc;
    },[]);
}
const arrangeByKey = (arr,key) => { // helper function
    return arr.reduce((acc,cur) => {
        acc[cur[key]] = acc[cur[key]] || [];
        acc[cur[key]].push(cur);
        return acc;
    }, {});
}
const roundValue = (val) => val.toFixed(2); // helper function
const buildMonthsArrayFromASingleRow = (arr) => { // helper function
    const dataToUse = arr.map(ent => {
        return {...ent,month:new Date(ent.date).getMonth()}
    })
    const res = arrangeByKey(dataToUse,'month');
    const rows = [0,0,0,0,0,0,0,0,0,0,0,0];
    for(let i=0; i<rows.length-1; i++){
        if(res[i]) rows[i] = res[i];
    }
    const total = getRowTotal(rows);
    return rows.concat([Number(roundValue(total)),Number(roundValue(total/12))]);
}
const getSectionTotals = (rows) => { // helper function
    return rows.map(row => {
        return row.data.map(data => {
            if(typeof data === 'number') return data;
            return data.reduce((acc,cur) => acc + cur.amount,0)
        })
    }).reduce((r,a) => r.map((b,i) => a[i] + b)) // this adds all the arrays together
}
const getRowTotal = (row) => row.reduce((acc,cur) => Array.isArray(cur) ? acc + cur.reduce((ac,cu) => ac + cu.amount,0) : acc + cur,0); // helper function
const getSections = () => getUniqueBy(data,'section'); // get sections for the history filters and the toolbar
const getRowsBySection = (section) => getUniqueBy(data.filter(ent => ent.section === section),'row'); // get rows by section for the history filters and the toolbar
const filterData = (filters) => { // filter data by section, row, month and year
    return data.filter(ent => {
        const bySection = filters.section === 'all' ? true : ent.section === filters.section;
        const byRow = filters.row === 'all' ? true : ent.row === filters.row;
        const byMonth = filters.month === 'all' ? true : new Date(ent.date).getMonth() === filters.month;
        const byYear = filters.year === 'all' ? true : new Date(ent.date).getFullYear() === filters.year;
        return bySection && byRow && byMonth && byYear;
    })
}
const buildDataForRendering = () => { // build an array of sections, which has a rows array including all the associated rows
    const dataArrangedBySection = arrangeByKey(data,'section');
    const dataAndRowsOrganised = Object.values(dataArrangedBySection).map(row => {
        return {
            name:row[0].section,
            rows:arrangeByKey(row,'row')
        }
    });
    const rowsWithDataArrays = dataAndRowsOrganised.map(section => {
        return {
            ...section,
            rows:Object.values(section.rows).map(row => {
                return {
                    name:row[0].row,
                    data:buildMonthsArrayFromASingleRow(row)
                }
            })
        }
    });
    return rowsWithDataArrays.map(section => {
        const dataArray = getSectionTotals(section.rows);
        return {
            ...section,
            data:dataArray
        }
    })
    
}
const convertOldHistory = (history) => {
    const historyData = JSON.parse(history).map(ent => {
       return {
           section:ent.section,
           row:ent.row,
           amount:ent.amount,
           note:ent.note,
           date:ent.date
       }
   });
   return JSON.stringify(historyData);
}
console.log(JSON.stringify(buildDataForRendering()));
// console.log(convertOldHistory(oldHistory));