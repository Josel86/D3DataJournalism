// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 550;

var margin = {
  top: 20,
  right: 40,
  bottom: 70,
  left: 100,
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our scatter plot, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

// function used for updating x-scale var upon click on axis label
function xScale(healthdata, chosenXAxis) {
  if(chosenXAxis === "poverty") {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(healthdata, d => d[chosenXAxis]) - 0.5,
        d3.max(healthdata, d => d[chosenXAxis]) + 0.5, 40
      ])
      .range([0, width]);
  } 
  else if (chosenXAxis === "age") {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(healthdata, d => d[chosenXAxis]) - 4,
        d3.max(healthdata, d => d[chosenXAxis]) + 4, 48
      ])
      .range([0, width]);
  }
  else {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(healthdata, d => d[chosenXAxis]) -2000,
        d3.max(healthdata, d => d[chosenXAxis]) + 2200, 100000
      ])
      .range([0, width]);
  }
  return xLinearScale;

  //var xLinearScale = d3.scaleLinear()
//  .domain([d3.min(healthdata, d => d.poverty)-0.5, 
// d3.max(healthdata, d => d.poverty )+0.5, 30])
//  .range([0, width]);

}

// function used for updating x-scale var upon click on axis label
function yScale(healthdata, chosenYAxis) {
  // create scales
  if(chosenXAxis === "healthcare") {
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(healthdata, d => d[chosenYAxis]) - 3,
      d3.max(healthdata, d => d[chosenYAxis]) + 3
    ])
    .range([height, 0]);
  } 
  else if(chosenXAxis === "obesity") {
    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(healthdata, d => d[chosenYAxis]) - 1,
      d3.max(healthdata, d => d[chosenYAxis]) + 1.1
    ])
    .range([height, 0]);
  }
  else{
    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(healthdata, d => d[chosenYAxis]) - 1,
      d3.max(healthdata, d => d[chosenYAxis]) + 1.1
    ])
    .range([height, 0]);
  }
  return yLinearScale;
  //var yLinearScale = d3.scaleLinear()
  // .domain([d3.min(healthdata, d => d.healthcare)-1, 
  // d3.max(healthdata, d => d.healthcare)+1.1])
  //  .range([height, 0]);
}

// function used for updating xAxis var upon click on axis label
function renderAxesX(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating xAxis var upon click on axis label
function renderAxesY(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCirclesX(circlesGroup, textGroup, newXScale, chosenXaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  textGroup.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with a transition to
// new circles
function renderCirclesY(circlesGroup, textGroup, newYScale, chosenYaxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYaxis]));

  textGroup.transition()
  .duration(1000)
  .attr("y", d => newYScale(d[chosenYaxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTipX(chosenXAxis, circlesGroup, xLinearScale, yLinearScale) {
  if (chosenXAxis === "poverty") {
    var label = "Poverty:";
  }
  else if (chosenXAxis === "age") {
    var label = "Age:";
  }
  else {
    var label = "Household:";
  }

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([-8, 0])
    .html(function(d) {
      return (`${d.state}<br>${label} ${d[chosenXAxis]}%<br>${chosenYAxis}: ${d[chosenYAxis]}%`);
    });

    //Add the SVG Text Element to the svgContainer
//    var text = circlesGroup.selectAll("text")
//    .data(healthdata)
//    .enter()
//    .append("text");
    
//    var textLabels = text
//    .attr("x", d => xLinearScale(d[chosenXAxis]))
//    .attr("y", d => yLinearScale(d[chosenYAxis]))
//    .text(d => d.abbr)
//    .classed("stateText", true)
//    .attr("stroke", "teal")
//    .attr("font-size", "10px");

    circlesGroup.call(toolTip);
    
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
      })
  // onmouseout event
  .on("mouseout", function(data, index) {
    toolTip.hide(data);
  });

  return circlesGroup;


//  var toolTip = d3.tip()
//    .attr("class", "tooltip")
//    .offset([80, -60])
//    .html(function(d) {
//      return (`ok`);
//    });
//   circlesGroup.call(toolTip);

//  circlesGroup.on("mouseover", function(data) {
//    toolTip.show(data);
//  })
    // onmouseout event
//    .on("mouseout", function(data, index) {
//      toolTip.hide(data);
//    });

//  return circlesGroup;

//  var toolTip = d3.tip()
//    .attr("class", "d3-tip")
//    .offset([-8, 0])
//    .html(function(d) {
//      return (`${d.state}<br>${label} ${d[chosenXAxis]}%<br>${chosenYAxis}: ${d[chosenYAxis]}%`);
//  });

//  var cTip = circlesGroup
//    .append("circle")  
//    .classed("stateCircle", true)
//    .attr("cx", d => xLinearScale(d[chosenXAxis]))
//    .attr("cy", d => yLinearScale(d[chosenYAxis]))
//    .attr("r", "15")
//    .attr("opacity", ".5");

  //Create tooltip in the chart
//  cTip.call(toolTip);
//  circlesGroup.call(toolTip);

  //Create event listeners to display and hide the tooltip
//  cTip.on("mouseover", function(d) {
//  circlesGroup.on("mouseover", function(d) {
//    d3.select(this).style("stroke", "black")
//    toolTip.show(d, this);
//  })
  //on mouseout event
//  .on("mouseout", function(d, index) {
//    .on("mouseout", function(d, index) {
//      toolTip.hide(d);
//  });

//  circlesGroup.on("mouseover", function(data) {
//    toolTip.show(data);
//  })
    // onmouseout event
//    .on("mouseout", function(data, index) {
//      toolTip.hide(data);
//    });

//  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTipY(chosenYAxis, circlesGroup) {
  if (chosenYAxis === "healthcare") {
    var label = "Healthcare:";
  }
  else if (chosenYAxis === "obesity") {
    var label = "Obese:";
  }
  else {
    var label = "Smokes";
  }
  
//  var toolTip = d3.tip()
//    .attr("class", "tooltip")
//    .offset([-8, 0])
//    .html(function(d) {
//      return (`${d.state}<br>${label}: ${d[chosenXAxis]}%<br>${chosenYAxis}: ${d[chosenYAxis]}%`);
//    });

//  circlesGroup.call(toolTip);

//  circlesGroup.on("mouseover", function(data) {
//    toolTip.show(data);
//  })
    // onmouseout event
//    .on("mouseout", function(data, index) {
//      toolTip.hide(data);
//    });

  return circlesGroup;
}

// Import data 
d3.csv("assets/data/data.csv", function(err, healthdata) {
  if (err) throw err;
 
  // console.log(healthdata);
 // Step 1: Parse Data/Cast as numbers
 healthdata.forEach(function(d) {
    d.poverty = +d.poverty;
    d.age= +d.age; 
    d.income= +d.income; 

    d.healthcare= +d.healthcare; 
    d.obesity= +d.obesity; 
    d.smokes= +d.smokes; 
  });

// Step 2: Create scale functions
var xLinearScale = xScale(healthdata, chosenXAxis);
var yLinearScale = yScale(healthdata, chosenYAxis);

//var xLinearScale = d3.scaleLinear()
//  .domain([d3.min(healthdata, d => d.poverty)-0.5, d3.max(healthdata, d => d.poverty )+0.5, 30])
//  .range([0, width]);

//var yLinearScale = d3.scaleLinear()
//  .domain([d3.min(healthdata, d => d.healthcare)-1, d3.max(healthdata, d => d.healthcare)+1.1])
//  .range([height, 0]);
  
// Create axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

//Append axes to the chart
var xAxis = chart.append("g")
  .classed("x-axis", true)
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

//Append axes to the chart
var yAxis = chart.append("g")
  .call(leftAxis);

//Create Circles
var circlesGroup = chart.selectAll("circle")
    .data(healthdata).enter();
    
//Create text labels with state abbreviation for each circle
//circlesGroup.append("text")
//  .classed("stateText", true)
//  .attr("x", d => xLinearScale(d[chosenXAxis]))
//  .attr("y", d => yLinearScale(d[chosenYAxis]))
//  .attr("stroke", "teal")
//  .attr("font-size", "10px")
//  .text(d => d.abbr);    

var circle = chart.append('g').classed('join', true)

var circlesGroup = circle.selectAll("circle")
    .data(healthdata)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .classed("stateCircle", true)
    .attr("r", 20);

var textGroup = circle.selectAll('text')
    .data(healthdata)
    .enter()
    .append("text")
    .attr('x', d => xLinearScale(d[chosenXAxis]))//positions text towards the left of the center of the circle
    .attr('y', d => yLinearScale(d[chosenYAxis]))
    .classed("stateText", true)    
    .attr("stroke", "teal")
    .attr("font-size", "10px")
    .text(d => d.abbr);
   
//var text =  circlesGroup.selectAll('text')
//    .data(healthdata)
//    .append('text')
//    .classed("stateText", true)
//    .attr('dx', d => xLinearScale(d[chosenXAxis]))//positions text towards the left of the center of the circle
//    .attr('dy',d => yLinearScale(d[chosenYAxis]))
//    .attr("stroke", "teal")
//    .attr("font-size", "10px")
//    .text(d => d.abbr);

//Initialize tool tip
//var toolTip = d3.tip()
//    .attr("class", "d3-tip")
//    .offset([-8, 0])
//    .html(function(d) {
//      return (`${d.state}<br>${chosenXAxis}: ${d[chosenXAxis]}%<br>${chosenYAxis}: ${d[chosenYAxis]}%`);
//  });

//var cTip = circlesGroup
//  .append("circle")  
//  .classed("stateCircle", true)
//  .attr("cx", d => xLinearScale(d[chosenXAxis]))
//  .attr("cy", d => yLinearScale(d[chosenYAxis]))
//  .attr("r", "15")
//  .attr("opacity", ".5");

//Create tooltip in the chart
//cTip.call(toolTip);

//Create event listeners to display and hide the tooltip
//cTip.on("mouseover", function(d) {
//  d3.select(this).style("stroke", "black")
//  toolTip.show(d, this);
//})
  //on mouseout event
//  .on("mouseout", function(d, index) {
//    d3.select(this).style("stroke", "blue")
//    .attr("r", "10")
//    toolTip.show(d);
//  });

  var labelsGroupX = chart.append("g")
    .attr("transform", `translate(${width / 2}, ${height })`);

  var labelsGroupY = chart.append("g")
    .attr("transform", `translate(${0}, ${height / 2 })`);

  var povertyLabel = labelsGroupX.append("text")
    .attr("x", 0)
    .attr("y", 30)
    .attr("value", "poverty") // value to grab for event listener
    .classed("active", true)
    .text("In Poverty (%)");

var medianAgeLabel = labelsGroupX.append("text")
    .attr("x", 0)
    .attr("y", 50)
    .attr("value", "age") // value to grab for event listener
    .classed("inactive", true)
    .text("Age (Median)");

var medianIncomeLabel = labelsGroupX.append("text")
    .attr("x", 0)
    .attr("y", 70)
    .attr("value", "income") // value to grab for event listener
    .classed("inactive", true)
    .text("Household Income (Median)");

// Create Y-axis and X-axis labels
var lacksHealthLabel = labelsGroupY.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 55)
    .attr("x", 0)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .attr("value", "healthcare") // value to grab for event listener
    .classed("active", true)
    .text("Lacks Healthcare (%)");

  var smokesLabel = labelsGroupY.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 30 )
    .attr("x", 0)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .attr("value", "smokes") // value to grab for event listener
    .classed("inactive", true)
    .text("Smokes (%)");

  var obeseLabel = labelsGroupY.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left  )
    .attr("x", 0)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .classed("inactive", true)
    .attr("value", "obesity") // value to grab for event listener
    .text("Obese (%)");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTipX(chosenXAxis, circlesGroup, xLinearScale, yLinearScale);

  // updateToolTip function above csv import
//  var circlesGroup = updateToolTipY(chosenYAxis, circlesGroup);
 
  // x axis labels event listener
  labelsGroupX.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      console.log(value);
      console.log(chosenXAxis);

      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(healthdata, chosenXAxis);
        
        // updates x axis with transition
        xAxis = renderAxesX(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCirclesX(circlesGroup, textGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTipX(chosenXAxis, circlesGroup, xLinearScale, yLinearScale);

        // changes classes to change bold text
                // changes classes to change bold text
                if (chosenXAxis === "poverty") {
                  povertyLabel
                    .classed("active", true)
                    .classed("inactive", false);
                  medianAgeLabel
                    .classed("active", false)
                    .classed("inactive", true);
                  medianIncomeLabel
                    .classed("active", false)
                    .classed("inactive", true);
                }
                else if (chosenXAxis === "age") {
                  povertyLabel
                    .classed("active", false)
                    .classed("inactive", true);
                  medianAgeLabel
                    .classed("active", true)
                    .classed("inactive", false);
                  medianIncomeLabel
                    .classed("active", false)
                    .classed("inactive", true);
                }
                else 
                {
                  povertyLabel
                    .classed("active", false)
                    .classed("inactive", true);
                  medianAgeLabel
                    .classed("active", false)
                    .classed("inactive", true);
                  medianIncomeLabel
                    .classed("active", true)
                    .classed("inactive", false);
                }        
      }
    });

  // y axis labels event listener
  labelsGroupY.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      console.log(value);
      console.log(chosenYAxis);

      if (value !== chosenYAxis) {
        // replaces chosenYAxis with value
        chosenYAxis = value;

        // functions here found above csv import
        // updates y scale for new data
        yLinearScale = yScale(healthdata, chosenYAxis);

        // updates y axis with transition
        yAxis = renderAxesY(yLinearScale, yAxis);

        // updates circles with new y values
        circlesGroup = renderCirclesY(circlesGroup, textGroup, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTipY(chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "healthcare") {
          lacksHealthLabel
            .classed("active", true)
            .classed("inactive", false);
          obeseLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenYAxis === "obesity") {
          lacksHealthLabel
            .classed("active", false)
            .classed("inactive", true);
          obeseLabel
            .classed("active", true)
            .classed("inactive", false);
          smokesLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else 
        {
          lacksHealthLabel
            .classed("active", false)
            .classed("inactive", true);
          obeseLabel
            .classed("active", false)
            .classed("inactive", true);
          smokesLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });

});
