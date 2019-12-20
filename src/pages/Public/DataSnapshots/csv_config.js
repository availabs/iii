import unemployment_config from 'pages/Public/DataSnapshots/components/csv/2014/unemployment'
import income_config from 'pages/Public/DataSnapshots/components/csv/2014/income'
import poverty_config from 'pages/Public/DataSnapshots/components/csv/2014/poverty'
import edu_att_config from 'pages/Public/DataSnapshots/components/csv/2014/edu_att'
import eng_prof_config from 'pages/Public/DataSnapshots/components/csv/2014/eng_prof'
import demographics_config from 'pages/Public/DataSnapshots/components/csv/2014//demographics/'
const config = {};

['2014','2015','2016','2017','2018','HISP_2016'].map(item =>{
    config[item] = {'UnEmp':[
                        {
                            'Foreign Born': unemployment_config['FB_ALL_csv'],
                            'Native Born': unemployment_config['NB_ALL_csv'],
                        },
                        {
                            'Foreign Born People of Color': unemployment_config['FB_POC_csv'],
                            'Native Born White Non Hispanic': unemployment_config['NB_WNH_csv'],
                        },
                        {
                            'Foreign Born Male':unemployment_config['FB_ALL_csv'],
                            'Foreign Born Female':unemployment_config['FB_ALL_csv']
                        }
                    ],
                'Avg_PINCP':[
                    {
                        'Foreign Born': income_config['FB_ALL_csv'],
                        'Native Born': income_config['NB_ALL_csv'],
                    },
                    {
                        'Foreign Born People of Color': income_config['FB_POC_csv'],
                        'Native Born White Non Hispanic': income_config['NB_WNH_csv'],
                    },
                    {
                        'Foreign Born Male':income_config['FB_ALL_csv'],
                        'Foreign Born Female':income_config['FB_ALL_csv']
                    }
                ],
                'Poverty':[
                    {
                        'Foreign Born': poverty_config['FB_ALL_csv'],
                        'Native Born': poverty_config['NB_ALL_csv'],
                    },
                    {
                        'Foreign Born People of Color': poverty_config['FB_POC_csv'],
                        'Native Born White Non Hispanic': poverty_config['NB_WNH_csv'],
                    },
                    {
                        'Foreign Born Male':poverty_config['FB_ALL_csv'],
                        'Foreign Born Female':poverty_config['FB_ALL_csv']
                    }
                ],
                'Edu_percent':[
                    {
                        'Foreign Born': edu_att_config['FB_ALL_csv'],
                        'Native Born': edu_att_config['NB_ALL_csv'],
                    },
                    {
                        'Foreign Born People of Color': edu_att_config['FB_POC_csv'],
                        'Native Born White Non Hispanic': edu_att_config['NB_WNH_csv'],
                    },
                    {
                        'Foreign Born Male':edu_att_config['FB_ALL_csv'],
                        'Foreign Born Female':edu_att_config['FB_ALL_csv']
                    }
                ],
                'Demographics':[
                    {
                        'Foreign Born': demographics_config['FB_ALL_csv'],
                        //'Native Born': edu_att_config['NB_ALL_csv'],
                    },
                ],
                'Eng_Prof':[
                    {
                        'Foreign Born': eng_prof_config['FB_ALL_csv'],
                        'Foreign Born People of Color': eng_prof_config['FB_POC_csv'],
                    },
                    {
                        'Foreign Born Male':eng_prof_config['FB_ALL_csv'],
                        'Foreign Born Female':eng_prof_config['FB_ALL_csv']
                    }
                ]

                }
});

export default config