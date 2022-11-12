
// bar chart of activities

class BarChart {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;

        this.initVis()
    }

    initVis() {

        let vis = this;

        console.log('here (initVis)')

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // initialize the drawing area
        vis.svg = d3.select('#' + vis.parentElement).append('svg')
            .attr('width', vis.width + vis.margin.left + vis.margin.right)
            .attr('height', vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);


        // scales and axes
        vis.x = d3.scaleLinear()
            .range( [ 0, vis.width ] );

        vis.y = d3.scaleBand()
            .rangeRound( [ 0, vis.height ] )
            .padding(0.2);

        vis.xAxis = d3.axisBottom()
            .scale(vis.x);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        this.wrangleData()

    }

    wrangleData() {

        let vis = this;

        vis.updateVis()

    }

    updateVis() {

        let vis = this;
    }

}