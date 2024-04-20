import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadarController, Title, Tooltip, RadialLinearScale } from 'chart.js';
import { Line, Bar, Pie, Bubble, Radar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadarController, RadialLinearScale, Title, Tooltip);

/*
    * This component is used to display the expanded chart widget.
    * It will display the chart with the data provided in the widget.
    * The widget data is passed as props to this component.
    * STRUCTURE OF WIDGET DATA:
    * {
        "widget_name": STRING
        "widget_type": NUMBER, For charts, it is 1.
        "dataset": NUMBER,
        "project_id": NUMBER,
        "configuration": {
            "x_axis": NUMBER,
            "chart_type": NUMBER,
            "ChartSeries": [
                {
                    "series_name": STRING,
                    "clm_id": NUMBER,
                    "device_id": NUMBER
                },
                {
                    "series_name": "Series 2",
                    "clm_id": 107,
                    "device_id": 26
                }
            ]
        }
    * }
*/
export default function ExpandedChart({ widget }) {
    // ---------- States for chart details ----------
    const [chartDetails, setChartDetails] = useState({
        chart_id: 1,
        x_axis: 0,
        chart_type: 2
    });

    // ---------- States for chart series ----------
    const [chartSeries, setChartSeries] = useState([
        {
            series_id: 1,
            series_name: "Temperature Device 1",
            clm_id: 146,
            device_id: 72
        }
    ]);

    // ---------- States for chart data ----------
    const [chartData, setChartData] = useState([{
        series_id: 1,
        data: [
            { id: 1, x: "2021-09-01 00:00:00", y: 20 },
            { id: 1, x: "2021-09-01 01:00:00", y: 23 },
            { id: 1, x: "2021-09-01 02:00:00", y: 16 },
            { id: 1, x: "2021-09-01 03:00:00", y: 25 },
            { id: 1, x: "2021-09-01 04:00:00", y: 21 },
            { id: 1, x: "2021-09-01 05:00:00", y: 22 },
            { id: 1, x: "2021-09-01 06:00:00", y: 20 },
            { id: 1, x: "2021-09-01 07:00:00", y: 22 },
            { id: 1, x: "2021-09-01 08:00:00", y: 19 },
            { id: 1, x: "2021-09-01 09:00:00", y: 24 },
            { id: 1, x: "2021-09-01 10:00:00", y: 20 },
        ]
    }]);

    // ---------- States for chart configuration ----------
    const [chartConfig, setChartConfig] = useState({
        labels: [],
        datasets: []
    });

    const [chartOptions, setChartOptions] = useState({
        scales: {
            x: {
                title: {
                    display: false,
                },
                type: 'category',
                ticks: {
                    display: chartDetails.chart_type == 3 ? false : true,
                    color: 'gray', // changes the color of the x-axis labels
                },
                grid: {
                    display: chartDetails.chart_type == 3 ? false : true,
                    color: '#111111', // changes the color of the x-axis grid lines
                },
            },
            y: {
                title: {
                    display: false,
                },
                ticks: {
                    display: chartDetails.chart_type == 3 ? false : true,
                    color: 'gray', // changes the color of the y-axis labels
                },
                grid: {
                    display: chartDetails.chart_type == 3 ? false : true,
                    color: '#111111', // changes the color of the y-axis grid lines
                },
            }
        },
        responsive: true,
    });

    useEffect(() => {
        classifyWidgetDetails();
        configureChart();
    }, []);

    useEffect(() => {
        loadChartData();
    }, [chartDetails, chartSeries]);

    /*
    * ---------- Function to classify widget details ----------
    * Seek through the widget object and fill chartDetails and chartSeries states with necessary details
    * If x_axis = null, then set the x_axis of chartDetails as 0 (Timestamp)
    * If device_id = null in chart series, then set the device_id of chartSeries as 0 (All Devices)
    * Chart types:
    * 1 - Area Chart (These are line charts with fill option enabled)
    * 2 - Bar Chart
    * 3 - Pie Chart
    * 4 - Line Chart
*/
    const classifyWidgetDetails = () => {

    }

    /*
        * This function loads chart data from the server.
        * Load data for each series in the chartSeries state.
        * After data is loaded, they are mapped as chart data and set to the state.
        * ELEMENT STRUCTURE OF chartData STATE:
        * [
        *      {
        *       series_id: NUMBER,
        *      data: [-
        *         { id: NUMBER, x: STRING , y: NUMBER }
        *      ],
        *      }
        *     {
        *     series_id: NUMBER,
        *     data: [
        *        { id: NUMBER, x: STRING , y: NUMBER }
        *      ]
        *     }
        * ]
        * { id: NUMBER, x: STRING , y: NUMBER }
    */
    const loadChartData = async () => {

    }

    /*
        * This function configures the chart for display.
        * It will set the labels and datasets for the chart.
        * The datasets are generated based on the series data.
        * The colors for each series are generated randomly.
        * STRUCTURE OF chartConfig STATE:
        * {
        *       labels: [STRING],
        *       datasets: [
        *           { label: STRING, data: [NUMBER], fill: BOOLEAN, borderColor: STRING, tension: NUMBER, borderWidth: NUMBER }
        *       ]
        * }
    */
    const configureChart = () => {
        let newChartConfig = {};
        let newLabels = [];
        let newData = [];
        let newDatasets = [];

        for (let series of chartSeries) {
            let seriesData = chartData.filter(data => data.series_id == series.series_id);

            newData = [];
            for (let data of seriesData[0].data) {
                newLabels.push(data.x);
                newData.push(data.y);
            }

            let color = '';
            if (chartDetails.chart_type == 3) {
                color = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'];
            } else {
                color = `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, 1)`;
            }

            newDatasets.push({
                label: series.series_name,
                data: newData,
                fill: false,
                backgroundColor: color,
                borderColor: color,
                tension: 0.2,
                borderWidth: 1
            });
        }

        newChartConfig = {
            labels: newLabels,
            datasets: newDatasets
        }

        setChartConfig(newChartConfig);
    }

    return (
        <div className={``}>
            {/* px-2 sm:px-10 mt-8 mb-8 xl:h-[700px] */}
            {(chartDetails.chart_type == 1) && <Bubble data={chartConfig} options={chartOptions} />}
            {chartDetails.chart_type == 2 && <Bar data={chartConfig} options={chartOptions} />}
            {chartDetails.chart_type == 3 && (<Pie data={chartConfig} options={chartOptions} />)}
            {(chartDetails.chart_type == 4) && <Line data={chartConfig} options={chartOptions} />}
        </div>
    );
}