import { Component, OnInit, Directive, ElementRef } from '@angular/core';
import * as D3 from 'd3';

@Component({
  selector: 'app-multilinechart',
  templateUrl: './multilinechart.component.html',
  styleUrls: ['./multilinechart.component.css']
})
export class MultilinechartComponent implements OnInit {

  private htmlElement: HTMLElement;

  constructor(elementRef: ElementRef) {
    this.htmlElement = elementRef.nativeElement;  // reference to <bar-graph> element from the main template
    console.log(this.htmlElement);
    console.log(D3);

    let d3: any = D3;

    var data = [{
      "date": "2016-10-01",
      "sales": 110,
      "searches": 67
    }, {
      "date": "2016-10-02",
      "sales": 120,
      "searches": 67
    }, {
      "date": "2016-10-03",
      "sales": 125,
      "searches": 69.4
    }, {
      "date": "2016-10-04",
      "sales": 100,
      "searches": 67
    }, {
      "date": "2016-10-05",
      "sales": 99,
      "searches": 66
    }, {
      "date": "2016-10-06",
      "sales": 131,
      "searches": 67
    }, {
      "date": "2016-10-07",
      "sales": 111,
      "searches": 47
    }, {
      "date": "2016-10-08",
      "sales": 110,
      "searches": 67
    }, {
      "date": "2016-10-09",
      "sales": 130,
      "searches": 67
    }, {
      "date": "2016-10-10",
      "sales": 110,
      "searches": 67
    }, {
      "date": "2016-10-11",
      "sales": 110,
      "searches": 67
    }];

    var margin = {
      top: 20,
      right: 80,
      bottom: 30,
      left: 50
    },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // parse the date / time
    var parseDate = d3.timeParse("%Y-%m-%d");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var line = d3.line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.sales);
      });

    var svg = d3.select(this.htmlElement).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // format the data
    data.forEach(function (d) {
      d.date = parseDate(d.date);
    });

    x.domain(d3.extent(data, function (d) {
      return d.date;
    }));

    y.domain([0, d3.max(data, function (d) {
      return d.sales > d.searches ? d.sales : d.searches;
    })]);

    // Add the line path.
    svg.append("path")
      .attr("class", "line")
      .style("fill", "none")
      .attr("d", line(data))
      .style("stroke", "orange");

    // change line to look at searches
    line.y(function (d) {
      return y(d.searches);
    });

    // Add the second line path.
    svg.append("path")
      .attr("class", "line")
      .style("fill", "none")
      .attr("d", line(data))
      .style("stroke", "steelblue");

    // Add the scatterplot
    svg.selectAll("dot")
      .data(data)
      .enter().append("circle")
      .attr("r", 5)
      .attr("cx", function (d) { return x(d.date); })
      .attr("cy", function (d) { return y(d.sales); });

    // Add sales to the scatterplot
    svg.selectAll(".sales-circle")
      .data(data)
      .enter().append("circle")
      .attr('class', 'sales-circle')
      .attr("r", 5)
      .attr("cx", function (d) { return x(d.date); })
      .attr("cy", function (d) { return y(d.sales); })
      .style("fill", "orange");

    // Add searches to the scatterplot
    svg.selectAll(".searches-circle")
      .data(data)
      .enter().append("circle")
      .attr("r", 5)
      .attr('class', 'searches-circle')
      .attr("cx", function (d) { return x(d.date); })
      .attr("cy", function (d) { return y(d.searches); })
      .style("fill", "steelblue");

    // Add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");



  }

  ngOnInit() {


  }

}
