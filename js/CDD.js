

// set the dimensions and margins of the graph
	const margin1 = {top: 30, right: 60, bottom: 70, left: 60},
	width1 = 1200 - margin1.left - margin1.right,
	height1 = 580 - margin1.top - margin1.bottom;

	const svg1 = d3_7.select("#dee508")
	.append("svg")
	.attr("width", width1 + margin1.left + margin1.right)
	.attr("height", height1 + margin1.top + margin1.bottom)
	.append("g")
	.attr("transform", `translate(${margin1.left}, ${margin1.top})`);

// Create tooltip
	const tooltip = d3_7.select('body').append('div')
	.attr('class', "tooltip")
	.attr('id', 'mapTooltip')

	// Initialize the X axis
	const x = d3_7.scaleBand()
	.range([ 0, width1+50])
	.padding(1);
	const xAxis = svg1.append("g")
	.attr("transform", `translate(0, ${height1})`)

//adding x-axis labels
	svg1.append("text")      // text label for the x axis
		.attr("x", width1 / 2)
		.attr("y",  height1 + margin1.bottom)
		.style("text-anchor", "middle")
		.style("font-size", "15px")
		.style("color","#456983")
		.text("Cities");



	// Initialize the Y axis
	const y = d3_7.scaleLinear()
	.range([ height1, 0]);
	const yAxis = svg1.append("g")
	.attr("class", "myYaxis")

//adding y-axis labels
	svg1.append("text")      // text label for the x axis
		.attr("x", width1 / 2)
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin1.left)
		.attr("x",0 - (height1 / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-size", "15px")
		.style("color","#0f0308")
		.text("Cooling Degree Days (CDD)");


	// A function that create / update the plot for a given variable:
	function update(selectedVar) {
		if (selectedVar == '2020 CDD') {
			d3_7.select('#btn-2020')
				.style('background-color', '#b21031');
		} else {
			d3_7.select('#btn-2020')
				.style('background-color', '#456983');
		}

		if (selectedVar == '2050 CDD') {
			d3_7.select('#btn-2050')
				.style('background-color', '#456983');
		} else {
			d3_7.select('#btn-2050')
				.style('background-color', '#cccccc');
		}

		if (selectedVar == '2080 CDD') {
			d3_7.select('#btn-2080')
				.style('background-color', '#b21031');
		} else {
			d3_7.select('#btn-2080')
				.style('background-color', '#cccccc');
		}

	// Parse the Data
	d3_7.csv("data/CDD_cities.csv").then( function(data) {

		// X axis
		x.domain(data.map(function(d) { return d.City; }))
		xAxis.transition().duration(1000).call(d3_7.axisBottom(x))


		// Add Y axis
		y.domain([0, 3850 ]);
		yAxis.transition().duration(1000).call(d3_7.axisLeft(y));



		// variable u: map data to existing circle
		const j = svg1.selectAll(".myLine")
			.data(data)
		// update lines
		j
			.join("line")
			.attr("class", "myLine")
			.transition()
			.duration(1000)
			.attr("x1", function(d) { return x(d.City); })
			.attr("x2", function(d) { return x(d.City); })
			.attr("y1", y(0))
			.attr("y2", function(d) { return y(d[selectedVar]); })
			.attr("stroke", "darkgrey")
			.attr("stroke-width", 3)



		// variable u: map data to existing circle
		const u = svg1.selectAll("circle")
			.data(data)
		// update bars
		u
			.join("circle")
			.transition()
			.duration(1000)
			.attr("cx", function(d) { return x(d.City); })
			.attr("cy", function(d) { return y(d[selectedVar]); })
			.attr("r", 20)
			.attr("fill", "#b21031")
			u.on("mouseover", function(d, i){
					tooltip
					.style("opacity", 1)
					.style("left", d.pageX + 20 + "px")
					.style("top", d.pageY + "px")
					.html(`
                         <div class='tip-box'>
                             <h3>${i.City}<h3>
                             <h4> Cooling Degree Days: ${i['2020 CDD']}</h4>
                         </div>`);

				})
					.on("mouseout", function(d){
						tooltip
							.style("opacity", 0)
							.style("left", 0)
							.style("top", 0)
							.html(``);

			u.on("click", function(d, i) {
				d.pulse = !d.pulse;
				if (d.pulse) {
					let selected_circles = d3_3.select(this);
					pulsate(selected_circles);

				}
			});
		function pulsate(selection) {
			recursive_transitions();
			function recursive_transitions() {
				if (selection.data()[0].pulse) {
					selection.transition()
						.duration(200)
						.attr("stroke-width", 2)
						.attr("r", 100)
						.ease('sin-in')
						.transition()
						.duration(800)
						.attr('stroke-width', 3)
						.attr("r", 12)
						.ease('bounce-in')
						.each("end", recursive_transitions);
				} else {
						// transition back to normal
					selection.transition()
						.duration(800)
						.attr("r", 0)
						.attr("fill-opacity","0")
						.attr("r", 20)
						.attr("fill-opacity","0.5")
						.style("fill","darkred")
						.transition()
						.duration(1000)
						.attr("r", 45)
						.attr("fill-opacity","0")
						.style("fill","darkred")
						.ease('sin-in')
						.attr("r", 25)
						.attr("fill-opacity","1")
						.style("fill","orange")
						//deactivate the below lines if you want pulsating color
						.duration(1000)
						.attr("r", 45)
						.attr("fill-opacity","0")
						.style("fill","orange")
						.each("end", recursive_transitions);
				}
			}

		}

			});



	})

}

	// Initialize plot
	update('2020 CDD')
