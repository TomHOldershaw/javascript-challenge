// Read JSON
d3.json("./samples.json").then(function(data) {
    let dropdowns = data.names;
    let metaData = data.metadata;
    let bellyData = data.samples;
    
    demographicData(metaData[0]);

// Dropdown
let ddsel = d3.select("#selDataset");

for (let i in dropdowns) {
    let sample = dropdowns[i];
    ddsel
    .append("option")
    .text(sample)
    .property("value", i);
};

    let subjectData = bellyData[0];
    let otu_ids = subjectData.otu_ids;
    let sample_values = subjectData.sample_values;
    let otu_labels = subjectData.otu_labels;
    
    let otu_ids_10 = otu_ids.slice(0, 10).reverse();
    let sample_values_10 = sample_values.slice(0, 10).reverse();
    let otu_labels_10 = otu_labels.slice(0,10).reverse();
    let otu_y_10 = otu_ids_10.map(otu => `OTU ${otu}`);

    // Empty charts
let ebarTrace = {
    y: otu_y_10,
    x: sample_values_10,
    type: "bar",
    orientation: "h",
    text: otu_labels_10
};

let ebarData = [ebarTrace];

let barLayout = {
    title: "Top 10 belly button bacteria",
  };

  Plotly.newPlot("bar", ebarData, barLayout);

let ebubbleTrace = {
    x: otu_ids,
    y: sample_values,
    mode: 'markers',
    marker: {
        color: otu_ids,
        size: sample_values.map(size => size/2)
    },
    text: otu_labels
};

let bubbleLayout = {
    title: "Prevalence of bacteria"
};

 Plotly.newPlot("bubble", [ebubbleTrace], bubbleLayout);

});

function Chart(subjectData) {
    let otu_ids = subjectData.otu_ids;
    let sample_values = subjectData.sample_values;
    let otu_labels = subjectData.otu_labels;

    let otu_ids_10 = otu_ids.slice(0, 10).reverse();
    let sample_values_10 = sample_values.slice(0, 10).reverse();
    let otu_labels_10 = otu_labels.slice(0,10).reverse();
    let otu_y_10 = otu_ids_10.map(otu => `OTU ${otu}`);

// Bar chart
  Plotly.restyle("bar", "y", [otu_y_10]);
  Plotly.restyle("bar", "x", [sample_values_10]);
  Plotly.restyle("bar", "text", [otu_labels_10]);

// Bubble chart
 Plotly.restyle("bubble", "x", [otu_ids]);
 Plotly.restyle("bubble", "y", [sample_values]);
 Plotly.restyle("bubble", "color", [otu_ids]);
 Plotly.restyle("bubble", "text", [otu_labels]);
 Plotly.restyle("bubble", "size", [sample_values])
}

// Demographic data
function demographicData(subjectMeta) {
 let dembox = d3.select("#metadata-list");
 dembox.text("");

for (let [key, value] of Object.entries(subjectMeta)) {
      dembox.append("text").text(`${key}: ${value}`).append("br");
}
}

// Gauge chart
function gaugeChart(subject) {

}

// Change data
function optionChanged(s) {
    d3.json("./samples.json").then(function(data) {
        let metaData = data.metadata;
        let bellyData = data.samples;
        Chart(bellyData[s]);
        demographicData(metaData[s])
    })};
