// Counter for average annual number of shark bites
const sharkBitesCounter = new countUp.CountUp('shark-bites-counter', 70,
    { enableScrollSpy: true,
        duration: 10,
        delay: 5,
        useEasing: true,
        scrollSpyDelay: 5000,
        prefix: '',
        suffix: ' bites',
        scrollSpyOnce: false
    }
)
//sharkBitesCounter


// Counter for average annual number of human fatalities
const humanFatalitiesCounter = new countUp.CountUp('human-fatalities-counter', 12,
                                                        { enableScrollSpy: true,
                                                          duration: 10,
                                                          delay: 15,
                                                          useEasing: true,
                                                          scrollSpyDelay: 8000,
                                                          prefix: '',
                                                          suffix: ' human fatalities',
                                                          scrollSpyOnce: false
                                                        }
                                                   )
humanFatalitiesCounter


// Counter for average annual number of shark fatalities
const sharkFatalitiesCounter = new countUp.CountUp('shark-fatalities-counter-annually', 100,
                                                        { enableScrollSpy: true,
                                                          duration: 10,
                                                          delay: 3,
                                                          useEasing: true,
                                                          scrollSpyDelay: 8000,
                                                          prefix: '',
                                                          suffix: ' million',
                                                          scrollSpyOnce: true
                                                        }
                                                   )
sharkFatalitiesCounter


