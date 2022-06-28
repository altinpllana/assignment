import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import agent from './agent/agent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(...registerables);

interface ChartObject {

  labels: Array<any>,
  datasets: Array<any>

}

function App() {

  const [data, setData] = useState<Array<any>>([]);

  const [labels, setLabels] = useState<Array<string>>([]);
  const [dataset, setDataset] = useState<Array<number>>([]);


  const [secondChartLabels, setSecondChartLabels] = useState<Array<string>>([]);
  const [secondChartDatasets, setSecondChartDatasets] = useState<Array<number>>([]);

  const chart: ChartObject = {
    labels: labels,
    datasets: [
      {
        label: "Asset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataset,
      },
    ],
  };

  const secondChart: ChartObject = {
    labels: secondChartLabels,
    datasets: [
      {
        label: "Asset ID",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: secondChartDatasets,
      },
    ],
  }

  const getData = () => {

    return agent.Request.api()

      .then(response => {

        const data = response.data

        setData(data);

        let Labels = labels;

        let Datasets = dataset;

        let SecondLabels = secondChartLabels;

        let SecondDatasets = secondChartDatasets;

        data.map((item: any) => {

          if (typeof item.asset !== undefined) Labels.push(item.asset);

          if (typeof item.aprYearly !== undefined) Datasets.push(item.aprYearly);

          if (typeof item.assetId !== undefined) SecondLabels.push(item.assetId);

          if (typeof item.aprDaily !== undefined) SecondDatasets.push(item.aprYearly);

        })


        setLabels(Labels);
        setDataset(Datasets);

        setSecondChartDatasets(SecondDatasets);
        setSecondChartLabels(SecondLabels);

      })
      .catch(e => {
        console.log(e.message);
      });

  }

  React.useEffect(() => {

    getData();

  }, [])


  return (
    <div className="container-fluid">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="col-md-12">

          {data &&
            (
              <div className="row">
                <div className="col-md-6">
                  <Line data={chart} />
                </div>
                <div className="col-md-6">
                  <Line data={secondChart} />
                </div>
              </div>

            )}
            
        </div>

      </header>
    </div>
  );
}

export default App;
