const data = [
    {section:'food',row:'groceries',amount:13.42,note:'Aldi',date:'2019-08-05T18:38:17.792Z'},
    {section:'food',row:'groceries',amount:26.7,note:'B&M',date:'2019-08-05T18:38:17.792Z'},
    {section:'food',row:'restaurants',amount:26.7,note:'Lowes Arms',date:'2019-08-05T18:38:17.792Z'},
    {section:'personal',row:'squash',amount:1.5,note:'Court',date:'2019-07-05T18:38:17.792Z'},
    {section:'personal',row:'squash',amount:2,note:'Light money',date:'2019-07-05T18:38:17.792Z'},
    {section:'blackRio',row:'petrol',amount:35.01,note:'Asda',date:'2019-07-05T18:38:17.792Z'},
];
const getUniqueBy = (arr,val) => {
    return arr.reduce((acc,cur) => {
        if(acc.indexOf(cur[val]) < 0) acc.push(cur[val]);
        return acc;
    },[]);
}
const getSections = () => getUniqueBy(data,'section'); // get sections for the history filters and the toolbar
const getRowsBySection = (section) => getUniqueBy(data.filter(ent => ent.section === section),'row'); // get rows for when selecting a row
const filterData = (filters) => { // filter data by section, row, month and year
    return data.filter(ent => {
        const bySection = filters.section === 'all' ? true : ent.section === filters.section;
        const byRow = filters.row === 'all' ? true : ent.row === filters.row;
        const byMonth = filters.month === 'all' ? true : new Date(ent.date).getMonth() === filters.month;
        const byYear = filters.year === 'all' ? true : new Date(ent.date).getFullYear() === filters.year;
        return bySection && byRow && byMonth && byYear;
    })
}
const buildSection = () => { // build an array of sections, which has a rows array including all the associated rows
    return getSections().map(section => {
        return {
            name:section,
            rows:data.map(ent => getRowsBySection(section).includes(ent.row) ? {name:ent.row, amount:ent.amount, note:ent.note, date:ent.date } : null).filter(e=>e)
        };
    })
}

/*
console.log(['all',...getSections()]); 
// [ 'all', 'food', 'personal', 'blackRio' ]

console.log(['all',...getRowsBySection('food')]);
// [ 'all', 'groceries', 'restaurants' ]

console.log(filterData({section:'food',row:'restaurants',month:7,year:2019})); 
// [ { section: 'food', row: 'restaurants', ...} ]
*/
console.log(buildSection())
/* returns the below array
[ 
    { 
        name: 'food',
        rows: [ 
            { name: 'groceries', amount: 13.42, note: 'Aldi', date: '2019-08-05T18:38:17.792Z' },
            { name: 'groceries', amount: 26.7, note: 'B&M', date: '2019-08-05T18:38:17.792Z' },
            { name: 'restaurants', amount: 26.7, note: 'Lowes Arms', date: '2019-08-05T18:38:17.792Z' } 
        ] 
    },
    { 
        name: 'personal',
        rows: [ 
            { name: 'squash', amount: 1.5, note: 'Court', date: '2019-07-05T18:38:17.792Z' },
            { name: 'squash', amount: 2, note: 'Light money', date: '2019-07-05T18:38:17.792Z' } 
        ] 
    },
    { 
        name: 'blackRio',
        rows: [ 
            { name: 'petrol', amount: 35.01, note: 'Asda', date: '2019-07-05T18:38:17.792Z' } 
        ] 
    }
]
 */