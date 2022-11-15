console.log('getting started on the final project!')

let promises = [
    d3.csv('data/activities-data.csv', d3.autoType),
    d3.csv('data/attacks-fatalities.csv', d3.autoType),
    d3.csv('data/odds.csv', d3.autoType)

];

Promise.all(promises)
    .then(function (data) {
        createVis(data)
    })
    .catch(function (err) {
        console.log(err)
    });


function createVis(data) {
    let barChartData = data[0]
    let lineChartData = data[1]
//    let lollipopData = data[2]

    console.log(data)

    // Instantiate the visualizations
    barChart = new BarChart('activities-bar-chart', barChartData);
    lineChart = new LineChart('line-plot-div', lineChartData);
//    lollipopChart = new LollipopChart('foo-div', lollipopChartData);

}


//d3.csv('data/activities-data.csv', d3.autoType).then(function(data) {

//    console.table(data)

//    // Instantiate the visualizations
//    barChart = new BarChart('activities-bar-chart', data)

    //lineChart = new LineChart('line-plot-div', data)

//    console.log(data)


//})

