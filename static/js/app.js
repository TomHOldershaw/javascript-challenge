// Read JSON
//d3.json("samples.json").then(function(data) {
    let dropdowns = data[0].names;
    let metaData = data[0].metadata;
    let bellyData = data[0].samples;
//})

// Dropdown
function dropdown() {
let ddsel = d3.select("#selDataset");

for (let i in dropdowns) {
    let sample = dropdowns[i];
    ddsel
    .append("option")
    .text(sample)
    .property("value", i);
}}

// Empty charts
let ebarTrace = {
    x: [],
    y: [],
    type: "bar",
    name: "",
    orientation: "h",
    text: []
}

let ebarData = [ebarTrace];

let barLayout = {
    title: "Occurence of belly button bacteria",
  };

  Plotly.newPlot("bar", ebarData, barLayout)

let ebubbleTrace = {
    x: [],
    y: [],
    mode: 'markers',
    color: [],
    size: [],
    text: []
}

let bubbleLayout = {
    title: "Prevalence of bacteria"
}

 Plotly.newPlot("bubble", [ebubbleTrace], bubbleLayout)

function Chart(s) {

// Bar chart
 let subjectData = bellyData[s];
 let otu_ids = subjectData.otu_ids;
 let sample_values = subjectData.sample_values;
 let otu_labels = subjectData.otu_labels;
 console.log(subjectData);
 console.log(otu_ids);

  Plotly.restyle("bar", "x", [otu_ids]);
  Plotly.restyle("bar", "y", [sample_values]);
  Plotly.restyle("bar", "name", dropdowns[s]);
  Plotly.restyle("bar", "text", [otu_labels]);

// Bubble chart
 Plotly.restyle("bubble", "x", [otu_ids]);
 Plotly.restyle("bubble", "y", [sample_values]);
 Plotly.restyle("bubble", "color", [otu_ids]);
 Plotly.restyle("bubble", "text", [otu_labels]);
 Plotly.restyle("bubble", "size", [sample_values])
}

// Demographic data
function demographicData(s) {
 let dembox = d3.select("#sample-metadata");
 let subjectMeta = metaData[s];
 let demtext = "";

for (let [key, value] of Object.entries(subjectMeta)) {
    dembox
      demtext = (demtext + key + ": " + value + "\<br\>");
}

dembox.text(demtext);

}

// Gauge chart
function gaugeChart(subject) {

}

// Change data
function optionChanged(subject) {
    Chart(subject);
    demographicData(subject);
    console.log("Index: " + subject);
    console.log("Subject: " + dropdowns[subject]);
}

dropdown();
optionChanged(0);