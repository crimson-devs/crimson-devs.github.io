console.log('getting started!')

d3.csv('data/activities-data.csv', d3.autoType).then(function(data) {

    console.table(data)

    // Instantiate the visualizations
    barChart = new BarChart('activities-bar-chart', data)

    //lineChart = newLineChart()

    console.log(data)


})

