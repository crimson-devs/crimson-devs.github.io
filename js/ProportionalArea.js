var render = (function () {
    var axis = [25, 50, 75, 100]

    var sqrtScale = d3.scaleSqrt()
        .domain([0, 100])
        .range([0, 200])

    var svg = d3.select('svg')
    var vis = svg.select('#vis')
    var width = +svg.attr('width')
    var height = +svg.attr('height')

    console.log('height', height)

    // append the axis circles
    vis.append('g')
        .attr('class', 'axis-wrap')
        .selectAll('circle')
        .data(axis)
        .enter().append('circle')
        .attr('class', function (d) { return 'axis axis-' + d; })
        .attr('r', function (d) { return sqrtScale(d); })
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .style('fill', 'none')
        .style('stroke', '#00b8b8')
        .style('opacity', 0.5)

    // append some axis labels
    vis.append('g')
        .attr('class', 'axis-labels-wrap')
        .selectAll('.axis-labels')
        .data(axis)
        .enter().append('text')
        .attr('x', width / 2)
        .attr('y', function (d) { return height / 2 + sqrtScale(d) + 5; })
        .style('text-anchor', 'end')
        .style('fill', '#00b8b8')
        .text(function (d) { return d + '%'; })

    // append a circle for the value
    var area = vis.append('circle')
        .attr('class', 'area-circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .style('fill', '#de3d83')
        .style('opacity', 0.9)
    // append it's value
    var areaLabel = vis.append('text')
        .attr('class', 'area-label')
        .attr('x', width / 2)
        .attr('y', height / 2 + 12)
        .style('text-anchor', 'middle')
        .style('font-size', '48px')
        .style('fill', '#e4bd0b')

    function update (val) {
        area.transition()
            .ease(d3.easeLinear)
            .duration(500)
            .attr('r', function (d) { return sqrtScale(val); })
        areaLabel.transition()
            .delay(100)
            .duration(500).text(val + '%')
    }
    // expose the update
    return update
})()
