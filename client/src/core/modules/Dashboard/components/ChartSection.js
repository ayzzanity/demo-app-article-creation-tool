import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';

import { Card } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function ChartSection() {
  const { t } = useTranslation('common')
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);
  useEffect(() => {
    const wew = async () => {
      let d = await axios.get(
        'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2020-06-01/2020-06-17?apiKey=4ejj532Qx68HmRpsSdmwb1pCIoXVfeCo'
      );

      let v = [];

      let vw = [];

      let o = [];
      let c = [];
      let h = [];

      let lb = [];
      let dataSets = [];
      d.data.results.forEach((b, i) => {
        v.push(b.v);
        vw.push(b.vw);
        o.push(b.o);
        c.push(b.c);
        h.push(b.h);

        lb.push(i);
      });

      let db = {
        //v,
        vw,
        o,
        c,
        h
      };

      for (const [key] of Object.entries(db)) {
        dataSets.push({
          label: t('# of Votes') + " " + key,
          data: db[key],

          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        });
      }

      setDataset(dataSets);
      setLabels(lb);
      // setData(bbb);
    };

    wew();
  }, []);

  const data1 = {
    labels: labels,
    datasets: dataset
    // datasets: [
    //   {
    //     label: '# of Votes',
    //     data: data,
    //     backgroundColor: [
    //       'rgba(255, 99, 132, 0.2)',
    //       'rgba(54, 162, 235, 0.2)',
    //       'rgba(255, 206, 86, 0.2)',
    //       'rgba(75, 192, 192, 0.2)',
    //       'rgba(153, 102, 255, 0.2)',
    //       'rgba(255, 159, 64, 0.2)'
    //     ],
    //     borderColor: [
    //       'rgba(255, 99, 132, 1)',
    //       'rgba(54, 162, 235, 1)',
    //       'rgba(255, 206, 86, 1)',
    //       'rgba(75, 192, 192, 1)',
    //       'rgba(153, 102, 255, 1)',
    //       'rgba(255, 159, 64, 1)'
    //     ],
    //     borderWidth: 1
    //   }
    // ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Card className="shadow-sm">
      <Line className="w-100" data={data1} height={100} options={options} />
    </Card>
  );
}

export default ChartSection;
