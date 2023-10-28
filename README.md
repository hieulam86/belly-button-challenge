# belly-button-challenge

# Belly Button Biodiversity Dashboard
    This project presents an interactive dashboard for exploring the Belly Button Biodiversity dataset. Utilizing the D3 library, JavaScript, HTML, and Plotly, this dashboard offers insightful visualizations. Here's a structured breakdown of the project:

    

## Project Overview
     Objective: Create an interactive dashboard for the Belly Button Biodiversity dataset, allowing users to explore various components. The dashboard comprises a horizontal bar chart, a bubble chart, sample metadata, and a gauge chart. All components update dynamically when selecting a new sample.

## Technical Skills Utilized
    The project leverages several technical skills:

      - D3 Library: The D3 library is used for data loading and manipulation.
      - JavaScript: JavaScript ensures interactivity and responsiveness.
      - HTML: HTML structures the dashboard's user interface.
      - Plotly: Plotly is employed for creating and rendering the charts.

## Project Parameters
    Here are the essential project parameters and functionalities:

      1. Data Loading: Data is fetched from a specified URL using the D3 library.
      2. Bar Chart: A horizontal bar chart displays the top 10 Operational Taxonomic Units (OTUs) found in an individual. The bar chart utilizes sample_values as values, otu_ids as labels, and otu_labels for hovertext.
      3. Bubble Chart: The dashboard features a bubble chart offering an overview of each sample. The x-axis uses otu_ids, the y-axis employs sample_values, marker size corresponds to sample_values, marker colors are determined by otu_ids, and text values are based on otu_labels.
      4. Sample Metadata: A panel is available for displaying sample metadata and demographic information. This information updates in real-time when selecting a new sample.
      5. User Interaction: All plots and metadata update instantly when selecting a new sample from the dropdown menu.
      6. Deployment: The dashboard is deployed for broader accessibility on a free static page hosting service, such as GitHub Pages.
