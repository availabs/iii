const config = {};
[2014,2015,2016,2017,2018].forEach(year => {
        config[year] = {
            'The Effects of Nativity Status' : {
                info: 'Effects of nativity status on economic outcomes of foreign-Born New Yorkers.',
                'Foreign-Born and Native-Born': {
                    'Bachelor’s Degree or More': 'group1',
                    'High School Diploma / Some College': 'group2'
                },
                'Foreign-Born Women and Native-Born Women': {
                    'Bachelor’s Degree or More': 'group5',
                    'High School Diploma / Some College': 'group6'
                },
            },
            'The Effects of Race' : {
                info: 'Effects of nativity status and race on economic outcomes of foreign-born New Yorkers.',
                'Foreign-Born people of color and Foreign-Born white non-hispanic': {
                    'Bachelor’s Degree or More': 'group3',
                    'High School Diploma / Some College': 'group4'
                },
                'Foreign-Born Women of color and Foreign-born non-hispanic white women': {
                    'Bachelor’s Degree or More': 'group7',
                    'High School Diploma / Some College': 'group8'
                },
            },
            'The Effects of Race and Nativity' : {
                info: 'Effects of nativity status and race on economic outcomes of foreign-born New Yorkers.',
                'Foreign-Born people of color and Native-Born non-hispanic white': {
                    'Bachelor’s Degree or More': 'group12',
                    'High School Diploma / Some College': 'group13'
                }
            },
            'The Effects of Gender' : {
                info: 'Effects of nativity status on economic outcomes of foreign-born women.',
                'All': {
                    'Bachelor’s Degree or More': 'group9',
                    'High School Diploma / Some College': 'group10'
                }
            },
            'The Effects of Low English Proficiency and Educational Attainment' : {
                info: 'Measures economic outcomes for the foreign-born with no high school diploma and low English proficiency.',
                'All': {
                    'All': 'group11'
                }
            },
        };
    });

 export default config
 export const measures = {
     'Overall':'Overall',
     'Full-Time Employment':'Full Time',
     'Poverty':'Poverty',
     'Working Poor':'Working Poor',
     'Home Ownership':'Homeownership',
     'Rent Burden':'Rent Burden',
     'Unemployment':'Unemployment',
     'Income Level for Full-Time Workers':'Income'
 };

// year, indicator, nativity, education, measure