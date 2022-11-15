// bar chart of activities

class LineChart {

    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;

        this.initVis()
    }

    initVis() {

        let vis = this;

        console.log('here (initVis)')

        vis.margin = {top: 40, right: 20, bottom: 40, left: 50};
        vis.width = 800 - vis.margin.left - vis.margin.right;
//        vis.width = document.getElementById(vis.parentElement).getBoundingClientRect().width - vis.margin.left - vis.margin.right;
        vis.height = 700 - vis.margin.top - vis.margin.bottom;
//        vis.height = document.getElementById(vis.parentElement).getBoundingClientRect().height - vis.margin.top - vis.margin.bottom;

        // initialize the drawing area
        vis.svg = d3.select('#' + vis.parentElement).append('svg')
            .attr('width', vis.width + vis.margin.left + vis.margin.right)
            .attr('height', vis.height + vis.margin.top + vis.margin.bottom)
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);


        // scales and axes
        vis.xScale = d3.scaleLinear()
            .range( [ 0, vis.width ] );

        vis.yScale = d3.scaleLinear()
            .range( [ vis.height, 0 ] );

        vis.xAxis = d3.axisBottom()
            .scale(vis.xScale);

        vis.yAxis = d3.axisLeft()
            .scale(vis.yScale);


        // create the axis groups
        vis.xAxisGroup = vis.svg.append('g')
            .attr('class', 'x-axis axis')
            .attr('transform', 'translate(0, ' + vis.height + ')');

        vis.yAxisGroup = vis.svg.append('g')
            .attr('class', 'y-axis axis');

        this.wrangleData()

    }

    wrangleData() {

        let vis = this;

        let filteredData = []

        filteredData = vis.data

        console.log('wrangle data sees: ', vis.data)


        vis.updateVis()

    }

    updateVis() {

        let vis = this;

        // update the domains
        vis.xScale.domain([ d3.min(vis.data, function(d) {return d.Year; }) - 3, d3.max(vis.data, function(d) {return d.Year; }) + 3 ] );
        vis.yScale.domain( [ 0, d3.max(vis.data, function(d) {return d.UnProvoked; }) ] );

        // draw the line
        vis.lines = vis.svg.selectAll('.line')
            .data(vis.data)

        vis.lines.exit().remove();

        // Add the line
        vis.lines
            .enter()
            .append('rect')
            .attr('class', 'line')
            .merge(vis.lines)
            .transition()
            .duration(2000)
            .style("opacity", 1.0)
            .attr("d", function(d){
                return d3.line()
                    .x(function(d) { return x(d.Year); })
                    .y(function(d) { return y(d.UnProvoked); })
                    (d.values)
            })
            .attr("stroke-width", 1.5)
        // vis.lines.exit()
        //     .transition().duration(1000).style("opacity", 0.0).remove()

        // add the axes
        // vis.xAxisGroup
        //     .transition()
        //     .duration(500)
        //     .style('font-size', '15px')
        //     .call(d3.axisBottom((vis.xScale)));
        //
        // vis.yAxisGroup
        //     .transition()
        //     .duration(500)
        //     .style('font-size', '15px')
        //     .call(d3.axisLeft(vis.yScale));


    }

}