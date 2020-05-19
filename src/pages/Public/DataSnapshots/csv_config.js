import unemployment_config from 'pages/Public/DataSnapshots/components/csv/2014/unemployment'
import income_config from 'pages/Public/DataSnapshots/components/csv/2014/income'
import poverty_config from 'pages/Public/DataSnapshots/components/csv/2014/poverty'
import edu_att_config from 'pages/Public/DataSnapshots/components/csv/2014/edu_att'
import eng_prof_config from 'pages/Public/DataSnapshots/components/csv/2014/eng_prof'
import demographics_config from 'pages/Public/DataSnapshots/components/csv/2014/demographics/'
import unemployment_config_2015 from 'pages/Public/DataSnapshots/components/csv/2015/unemployment'
import income_config_2015 from 'pages/Public/DataSnapshots/components/csv/2015/income'
import poverty_config_2015 from 'pages/Public/DataSnapshots/components/csv/2015/poverty'
import edu_att_config_2015 from 'pages/Public/DataSnapshots/components/csv/2015/edu_att'
import eng_prof_config_2015 from 'pages/Public/DataSnapshots/components/csv/2015/eng_prof'
import demographics_config_2015 from 'pages/Public/DataSnapshots/components/csv/2015/demographics/'
import unemployment_config_2016 from 'pages/Public/DataSnapshots/components/csv/2016/unemployment'
import income_config_2016 from 'pages/Public/DataSnapshots/components/csv/2016/income'
import poverty_config_2016 from 'pages/Public/DataSnapshots/components/csv/2016/poverty'
import edu_att_config_2016 from 'pages/Public/DataSnapshots/components/csv/2016/edu_att'
import eng_prof_config_2016 from 'pages/Public/DataSnapshots/components/csv/2016/eng_prof'
import demographics_config_2016 from 'pages/Public/DataSnapshots/components/csv/2016/demographics/'
import unemployment_config_2017 from 'pages/Public/DataSnapshots/components/csv/2017/unemployment'
import income_config_2017 from 'pages/Public/DataSnapshots/components/csv/2017/income'
import poverty_config_2017 from 'pages/Public/DataSnapshots/components/csv/2017/poverty'
import edu_att_config_2017 from 'pages/Public/DataSnapshots/components/csv/2017/edu_att'
import eng_prof_config_2017 from 'pages/Public/DataSnapshots/components/csv/2017/eng_prof'
import demographics_config_2017 from 'pages/Public/DataSnapshots/components/csv/2017//demographics/'
import unemployment_config_2018 from 'pages/Public/DataSnapshots/components/csv/2018/unemployment'
import income_config_2018 from 'pages/Public/DataSnapshots/components/csv/2018/income'
import poverty_config_2018 from 'pages/Public/DataSnapshots/components/csv/2018/poverty'
import edu_att_config_2018 from 'pages/Public/DataSnapshots/components/csv/2018/edu_att'
import eng_prof_config_2018 from 'pages/Public/DataSnapshots/components/csv/2018/eng_prof'
import demographics_config_2018 from 'pages/Public/DataSnapshots/components/csv/2018/demographics/'
import unemployment_config_HISP_2016 from 'pages/Public/DataSnapshots/components/csv/HISP_2016/unemployment'
import income_config_HISP_2016 from 'pages/Public/DataSnapshots/components/csv/HISP_2016/income'
import poverty_config_HISP_2016 from 'pages/Public/DataSnapshots/components/csv/HISP_2016/poverty'
import edu_att_config_HISP_2016 from 'pages/Public/DataSnapshots/components/csv/HISP_2016/edu_att'
import eng_prof_config_HISP_2016 from 'pages/Public/DataSnapshots/components/csv/HISP_2016/eng_prof'
import demographics_config_HISP_2016 from 'pages/Public/DataSnapshots/components/csv/HISP_2016/demographics/'
const config={
    '2014':{'UnEmp':[
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
    },
    '2015':{'UnEmp':[
            {
                'Foreign Born': unemployment_config_2015['FB_ALL_csv'],
                'Native Born': unemployment_config_2015['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': unemployment_config_2015['FB_POC_csv'],
                'Native Born White Non Hispanic': unemployment_config_2015['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':unemployment_config_2015['FB_ALL_csv'],
                'Foreign Born Female':unemployment_config_2015['FB_ALL_csv']
            }
        ],
        'Avg_PINCP':[
            {
                'Foreign Born': income_config_2015['FB_ALL_csv'],
                'Native Born': income_config_2015['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': income_config_2015['FB_POC_csv'],
                'Native Born White Non Hispanic': income_config_2015['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':income_config_2015['FB_ALL_csv'],
                'Foreign Born Female':income_config_2015['FB_ALL_csv']
            }
        ],
        'Poverty':[
            {
                'Foreign Born': poverty_config_2015['FB_ALL_csv'],
                'Native Born': poverty_config_2015['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': poverty_config_2015['FB_POC_csv'],
                'Native Born White Non Hispanic': poverty_config_2015['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':poverty_config_2015['FB_ALL_csv'],
                'Foreign Born Female':poverty_config_2015['FB_ALL_csv']
            }
        ],
        'Edu_percent':[
            {
                'Foreign Born': edu_att_config_2015['FB_ALL_csv'],
                'Native Born': edu_att_config_2015['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': edu_att_config_2015['FB_POC_csv'],
                'Native Born White Non Hispanic': edu_att_config_2015['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':edu_att_config_2015['FB_ALL_csv'],
                'Foreign Born Female':edu_att_config_2015['FB_ALL_csv']
            }
        ],
        'Demographics':[
            {
                'Foreign Born': demographics_config_2015['FB_ALL_csv'],
                //'Native Born': edu_att_config_2015['NB_ALL_csv'],
            },
        ],
        'Eng_Prof':[
            {
                'Foreign Born': eng_prof_config_2015['FB_ALL_csv'],
                'Foreign Born People of Color': eng_prof_config_2015['FB_POC_csv'],
            },
            {
                'Foreign Born Male':eng_prof_config_2015['FB_ALL_csv'],
                'Foreign Born Female':eng_prof_config_2015['FB_ALL_csv']
            }
        ]
    },
    '2016':{'UnEmp':[
            {
                'Foreign Born': unemployment_config_2016['FB_ALL_csv'],
                'Native Born': unemployment_config_2016['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': unemployment_config_2016['FB_POC_csv'],
                'Native Born White Non Hispanic': unemployment_config_2016['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':unemployment_config_2016['FB_ALL_csv'],
                'Foreign Born Female':unemployment_config_2016['FB_ALL_csv']
            }
        ],
        'Avg_PINCP':[
            {
                'Foreign Born': income_config_2016['FB_ALL_csv'],
                'Native Born': income_config_2016['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': income_config_2016['FB_POC_csv'],
                'Native Born White Non Hispanic': income_config_2016['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':income_config_2016['FB_ALL_csv'],
                'Foreign Born Female':income_config_2016['FB_ALL_csv']
            }
        ],
        'Poverty':[
            {
                'Foreign Born': poverty_config_2016['FB_ALL_csv'],
                'Native Born': poverty_config_2016['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': poverty_config_2016['FB_POC_csv'],
                'Native Born White Non Hispanic': poverty_config_2016['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':poverty_config_2016['FB_ALL_csv'],
                'Foreign Born Female':poverty_config_2016['FB_ALL_csv']
            }
        ],
        'Edu_percent':[
            {
                'Foreign Born': edu_att_config_2016['FB_ALL_csv'],
                'Native Born': edu_att_config_2016['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': edu_att_config_2016['FB_POC_csv'],
                'Native Born White Non Hispanic': edu_att_config_2016['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':edu_att_config_2016['FB_ALL_csv'],
                'Foreign Born Female':edu_att_config_2016['FB_ALL_csv']
            }
        ],
        'Demographics':[
            {
                'Foreign Born': demographics_config_2016['FB_ALL_csv'],
                //'Native Born': edu_att_config_2016['NB_ALL_csv'],
            },
        ],
        'Eng_Prof':[
            {
                'Foreign Born': eng_prof_config_2016['FB_ALL_csv'],
                'Foreign Born People of Color': eng_prof_config_2016['FB_POC_csv'],
            },
            {
                'Foreign Born Male':eng_prof_config_2016['FB_ALL_csv'],
                'Foreign Born Female':eng_prof_config_2016['FB_ALL_csv']
            }
        ]
    },
    '2017':{'UnEmp':[
            {
                'Foreign Born': unemployment_config_2017['FB_ALL_csv'],
                'Native Born': unemployment_config_2017['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': unemployment_config_2017['FB_POC_csv'],
                'Native Born White Non Hispanic': unemployment_config_2017['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':unemployment_config_2017['FB_ALL_csv'],
                'Foreign Born Female':unemployment_config_2017['FB_ALL_csv']
            }
        ],
        'Avg_PINCP':[
            {
                'Foreign Born': income_config_2017['FB_ALL_csv'],
                'Native Born': income_config_2017['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': income_config_2017['FB_POC_csv'],
                'Native Born White Non Hispanic': income_config_2017['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':income_config_2017['FB_ALL_csv'],
                'Foreign Born Female':income_config_2017['FB_ALL_csv']
            }
        ],
        'Poverty':[
            {
                'Foreign Born': poverty_config_2017['FB_ALL_csv'],
                'Native Born': poverty_config_2017['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': poverty_config_2017['FB_POC_csv'],
                'Native Born White Non Hispanic': poverty_config_2017['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':poverty_config_2017['FB_ALL_csv'],
                'Foreign Born Female':poverty_config_2017['FB_ALL_csv']
            }
        ],
        'Edu_percent':[
            {
                'Foreign Born': edu_att_config_2017['FB_ALL_csv'],
                'Native Born': edu_att_config_2017['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': edu_att_config_2017['FB_POC_csv'],
                'Native Born White Non Hispanic': edu_att_config_2017['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':edu_att_config_2017['FB_ALL_csv'],
                'Foreign Born Female':edu_att_config_2017['FB_ALL_csv']
            }
        ],
        'Demographics':[
            {
                'Foreign Born': demographics_config_2017['FB_ALL_csv'],
                //'Native Born': edu_att_config_2017['NB_ALL_csv'],
            },
        ],
        'Eng_Prof':[
            {
                'Foreign Born': eng_prof_config_2017['FB_ALL_csv'],
                'Foreign Born People of Color': eng_prof_config_2017['FB_POC_csv'],
            },
            {
                'Foreign Born Male':eng_prof_config_2017['FB_ALL_csv'],
                'Foreign Born Female':eng_prof_config_2017['FB_ALL_csv']
            }
        ]
        
    },
    '2018':{'UnEmp':[
            {
                'Foreign Born': unemployment_config_2018['FB_ALL_csv'],
                'Native Born': unemployment_config_2018['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': unemployment_config_2018['FB_POC_csv'],
                'Native Born White Non Hispanic': unemployment_config_2018['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':unemployment_config_2018['FB_ALL_csv'],
                'Foreign Born Female':unemployment_config_2018['FB_ALL_csv']
            }
        ],
        'Avg_PINCP':[
            {
                'Foreign Born': income_config_2018['FB_ALL_csv'],
                'Native Born': income_config_2018['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': income_config_2018['FB_POC_csv'],
                'Native Born White Non Hispanic': income_config_2018['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':income_config_2018['FB_ALL_csv'],
                'Foreign Born Female':income_config_2018['FB_ALL_csv']
            }
        ],
        'Poverty':[
            {
                'Foreign Born': poverty_config_2018['FB_ALL_csv'],
                'Native Born': poverty_config_2018['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': poverty_config_2018['FB_POC_csv'],
                'Native Born White Non Hispanic': poverty_config_2018['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':poverty_config_2018['FB_ALL_csv'],
                'Foreign Born Female':poverty_config_2018['FB_ALL_csv']
            }
        ],
        'Edu_percent':[
            {
                'Foreign Born': edu_att_config_2018['FB_ALL_csv'],
                'Native Born': edu_att_config_2018['NB_ALL_csv'],
            },
            {
                'Foreign Born People of Color': edu_att_config_2018['FB_POC_csv'],
                'Native Born White Non Hispanic': edu_att_config_2018['NB_WNH_csv'],
            },
            {
                'Foreign Born Male':edu_att_config_2018['FB_ALL_csv'],
                'Foreign Born Female':edu_att_config_2018['FB_ALL_csv']
            }
        ],
        'Demographics':[
            {
                'Foreign Born': demographics_config_2018['FB_ALL_csv'],
                //'Native Born': edu_att_config_2018['NB_ALL_csv'],
            },
        ],
        'Eng_Prof':[
            {
                'Foreign Born': eng_prof_config_2018['FB_ALL_csv'],
                'Foreign Born People of Color': eng_prof_config_2018['FB_POC_csv'],
            },
            {
                'Foreign Born Male':eng_prof_config_2018['FB_ALL_csv'],
                'Foreign Born Female':eng_prof_config_2018['FB_ALL_csv']
            }
        ]
    },
    'HISPANIC New Yorkers 5 year Estimate(2013-2017)':{'UnEmp':[
            {
                'Foreign Born Hispanic': unemployment_config_HISP_2016['FB_Hispanic_csv'],
                'Native Born Hispanic': unemployment_config_HISP_2016['NB_Hispanic_csv'],
            },
            {
                'Foreign Born Hispanic People of Color': unemployment_config_HISP_2016['FB_Hispanic_POC_csv'],
                'Foreign Born White Non Hispanic': unemployment_config_HISP_2016['FB_WNH_csv'],
            },
            {
                'Foreign Born Hispanic Male':unemployment_config_HISP_2016['FB_Hispanic_csv'],
                'Foreign Born Hispanic Female':unemployment_config_HISP_2016['FB_Hispanic_csv']
            }
        ],
        'Avg_PINCP':[
            {
                'Foreign Born Hispanic': income_config_HISP_2016['FB_Hispanic_csv'],
                'Native Born Hispanic': income_config_HISP_2016['NB_Hispanic_csv'],
            },
            {
                'Foreign Born Hispanic People of Color': income_config_HISP_2016['FB_Hispanic_POC_csv'],
                'Foreign Born White Non Hispanic': income_config_HISP_2016['FB_WNH_csv'],
            },
            {
                'Foreign Born Hispanic Male':income_config_HISP_2016['FB_Hispanic_csv'],
                'Foreign Born Hispanic Female':income_config_HISP_2016['FB_Hispanic_csv']
            }
        ],
        'Poverty':[
            {
                'Foreign Born Hispanic': poverty_config_HISP_2016['FB_Hispanic_csv'],
                'Native Born Hispanic': poverty_config_HISP_2016['NB_Hispanic_csv'],
            },
            {
                'Foreign Born Hispanic People of Color': poverty_config_HISP_2016['FB_Hispanic_POC_csv'],
                'Foreign Born White Non Hispanic': poverty_config_HISP_2016['FB_WNH_csv'],
            },
            {
                'Foreign Born Hispanic Male':poverty_config_HISP_2016['FB_Hispanic_csv'],
                'Foreign Born Hispanic Female':poverty_config_HISP_2016['FB_Hispanic_csv']
            }
        ],
        'Edu_percent':[
            {
                'Foreign Born Hispanic': edu_att_config_HISP_2016['FB_Hispanic_csv'],
                'Native Born Hispanic': edu_att_config_HISP_2016['NB_Hispanic_csv'],
            },
            {
                'Foreign Born Hispanic People of Color': edu_att_config_HISP_2016['FB_Hispanic_POC_csv'],
                'Foreign Born White Non Hispanic': edu_att_config_HISP_2016['FB_WNH_csv'],
            },
            {
                'Foreign Born Hispanic Male':edu_att_config_HISP_2016['FB_Hispanic_csv'],
                'Foreign Born Hispanic Female':edu_att_config_HISP_2016['FB_Hispanic_csv']
            }
        ],
        'Demographics':[
            {
                'Foreign Born': demographics_config_HISP_2016['FB_Hispanic_csv'],
                "Foreign Born Hispanic People of Color":demographics_config_HISP_2016['FB_Hispanic_POC_csv']
                //'Native Born': edu_att_config_HISP_2016['NB_ALL_csv'],
            },
        ],
        'Eng_Prof':[
            {
                'Foreign Born Hispanic': eng_prof_config_HISP_2016['FB_Hispanic_csv'],
                'Native Born Hispanic': eng_prof_config_HISP_2016['NB_Hispanic_csv'],
            },
            {
                'Foreign Born Hispanic People of Color':eng_prof_config_HISP_2016['FB_Hispanic_POC_csv'],
                'Foreign Born White Non Hispanic':eng_prof_config_HISP_2016['FB_WNH_csv']
            },
            {
                'Foreign Born Hispanic Male':eng_prof_config_HISP_2016['FB_Hispanic_csv'],
                'Foreign Born Hispanic Female':eng_prof_config_HISP_2016['NB_Hispanic_csv']
            }
        ]
    },

}

export default config