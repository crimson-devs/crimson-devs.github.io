console.log('getting started!')

d3.csv('data/shark-encounters.csv', d3.autoType).then(function(data) {

    console.table(data)

    // Instantiate the visualizations
    barChart = new BarChart('activities-bar-chart', data)

    console.log(data)


})

