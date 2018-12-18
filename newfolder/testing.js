// javascript
var data = [
    {"proto": "αγραπανέυσεις", "deutero": 11.8}, 
    {"proto": "καλιέργειες", "deutero": 53.1},
    {"proto": "κυπευτική γή", "deutero": 2.0},
    {"proto": "μόνιμες καλιεργειές", "deutero": 33.2},
];

var svgWidth = 500, svgHeight = 300, radius =  Math.min(svgWidth, svgHeight) / 2;
var svg = d3.select('#chart').append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//Create group element to hold pie chart    
var g = svg.append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")") ;



var color = d3.scaleOrdinal()
  .range(["#7dce94", "#3d3d3f" , "#f6f5f3", "#f9f8fd"]);

var pie = d3.pie().value(function(d) { 
     return d.deutero; 
});

var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
 
var arc = g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g");

arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.deutero); });
        
var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
            
arc.append("text")
    .attr("transform", function(d) { 
        return "translate(" + label.centroid(d) + ")"; 
    })
    .attr("text-anchor", "middle")
    .text(function(d) { return d.data.proto+""+d.data.deutero+"%"; });	
