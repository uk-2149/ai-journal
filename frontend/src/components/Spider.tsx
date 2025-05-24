import type { Journal } from '../types/types';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

interface JournalCardProps {
    journal: Journal;
  }

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Spider = ({ journal }: JournalCardProps) => {

    const chartData = {
        labels: ['Happy', 'Sad', 'Angry', 'Stressed'],
        datasets: [
          {
            label: 'Mood Analysis',
            data: journal?.mood
              ? [
                  journal.mood.happy,
                  journal.mood.sad,
                  journal.mood.angry,
                  journal.mood.stressed,
                ]
              : [0, 0, 0, 0],
            backgroundColor: 'rgba(34, 211, 238, 0.6)', // sky-400 with opacity
            borderColor: 'rgb(14, 165, 233)', // sky-500
            pointBackgroundColor: 'rgb(14, 165, 233)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(14, 165, 233)',
          },
        ],
      };

      const chartOptions = {
        scales: {
          r: {
            angleLines: { display: true, color: '#4b5563' },
            grid: {
                color: '#374666',
              },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: { stepSize: 20, display: false },
            pointLabels: { font: { size: '15rem' } },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => `${context.label}: ${context.raw}%`,
            },
          },
        },
      };

  return (
    <div>
         {journal?.mood && (
              <div className="bg-gray-700/50 p-4 rounded-lg mt-4 mb-8">
                <h3 className="text-lg font-semibold text-white mb-2">Mood Analysis</h3>
                <div className="max-w-md mx-auto">
                  <Radar data={chartData} options={chartOptions} />
                </div>
              </div>
            )}
    </div>
  )
}

export default Spider;