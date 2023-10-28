// Define the url for the dataset
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the data using D3
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Initialize the dashboard when the data is successfully loaded
dataPromise.then(data => {
    // Select the dropdown menu for selecting a sample
    var selector = d3.select("#selDataset");

    // Retrieve all available sample names from the data
    var sampleNames = data.names;

    // Add the sample names as options in the dropdown menu
    sampleNames.forEach(sample => {
        selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Set the initial sample as the first sample name
    var initialSample = sampleNames[0];

    // Display demographic information and charts for the initial sample
    buildMetadata(initialSample, data);
    buildCharts(initialSample, data);
});

// This function is executed when a new sample is selected from the dropdown menu
function optionChanged(newSample) {
    // Update the information and charts for the newly selected sample
    dataPromise.then(data => {
        buildMetadata(newSample, data);
        buildCharts(newSample, data);
    });
}

// This function displays demographic information for the selected sample
function buildMetadata(sample, data) {
    // Retrieve the metadata for all samples
    var metadata = data.metadata;

    // Filter the metadata to obtain information for the selected sample
    var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var selectedSample = metadataArray[0];
    var PANEL = d3.select("#sample-metadata"); // Select the panel for demographic information

    // Clear the previous demographic information in the panel
    PANEL.html("");

    // Display the demographic information for the selected sample
    Object.entries(selectedSample).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
    });
}

// This function creates charts for the selected sample
function buildCharts(sample, data) {
    // Retrieve all sample data
    var samples = data.samples;

    // Filter the sample data to include only the selected sample
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    var metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    var selectedSample = sampleArray[0];

    // Retrieve data for the selected sample
    var otu_ids = selectedSample.otu_ids;
    var otu_labels = selectedSample.otu_labels;
    var sample_values = selectedSample.sample_values;
    var wfreq = metadataArray[0].wfreq;

    // Code for bar chart
    // Sort the data to obtain the top 10 OTUs
    var yticks = otu_ids.slice(0, 10).map(outId => `OTU ${outId}`).reverse();

    // Reverse the x-axis to ensure the bar chart has the largest on top
    var barData = [{
        x: sample_values.slice(0, 10).reverse(),
        y: yticks,
        type: "bar",
        orientation: "h",
        text: otu_labels.slice(0, 10),
    }];

    // Define the layout for the horizontal bar chart
    var barLayout = {
        title: "Top 10 OTUs Found in the Individual",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU ID" },
    };

    // Create the bar chart
    Plotly.newPlot("bar", barData, barLayout);

    // Call the function to build the Gauge Chart
    buildGaugeChart(wfreq);

    // Call the function to build the Bubble Chart
    buildBubbleChart(otu_ids, sample_values, otu_labels);
}

// Code for Gauge chart
function buildGaugeChart(wfreq) {
    // Calculate angles and coordinates for the gauge chart
    var degrees = 180 - wfreq * 20;
    var radius = 0.5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Create the path for the needle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ';
    var pathX = String(x);
    var space = ' ';
    var pathY = String(y);
    var pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    // Create the data for the scatter plot and the pie chart
    var scatterData = {
        type: 'scatter',
        x: [0],
        y: [0],
        marker: {
            size: 28,
            color: '850000',
        },
        showlegend: false,
        text: wfreq,
        hoverinfo: 'text'
    };

    var pieData = {
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        textinfo: 'text',
        textposition: 'inside',
        marker: {
            colors: ['rgba(15, 128, 0, .5)', 'rgba(15, 128, 0, .45)', 'rgba(15, 128, 0, .4)',
                'rgba(110, 154, 22, .5)', 'rgba(110, 154, 22, .4)', 'rgba(110, 154, 22, .3)',
                'rgba(210, 206, 145, .5)', 'rgba(210, 206, 145, .4)', 'rgba(210, 206, 145, .3)',
                'rgba(255, 255, 255, 0)']
        },
        hole: 0.5,
        type: 'pie',
        hoverinfo: 'text',
        showlegend: false
    };

    var gaugeData = [scatterData, pieData];

    var gaugeLayout = {
        // Needle
        shapes: [{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: { color: '850000' }
        }],
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 500,
        width: 500,
        xaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] },
        yaxis: { zeroline: false, showticklabels: false, showgrid: false, range: [-1, 1] }
    };

    // Create the gauge chart
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
}

// Code for Bubble Chart
function buildBubbleChart(otu_ids, sample_values, otu_labels) {
    var bubbleData = [{
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
        },
        text: otu_labels
    }];

    var bubbleLayout = {
        xaxis: { title: "OTU ID" }
    };

    // Create the bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
}





