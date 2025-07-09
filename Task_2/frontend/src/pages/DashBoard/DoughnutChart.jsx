import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    defaults
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

defaults.maintainAspectRatio = false
defaults.responsive=true

const DoughnutChart = ({ allBlogs }) => {
    // No. of blogs per user 

    // Count blogs per email (object hai ; key value pair mein aayega )
    const blogCnt = {};
    allBlogs?.forEach(blog => {
        blogCnt[blog.email] = (blogCnt[blog.email] || 0) + 1;
    });


    const labels = Object.keys(blogCnt); 
    const data = Object.values(blogCnt);

    const backgroundColors = [];
    const borderColors = [];

    const generateColor = () => {
        const hue = Math.floor(Math.random() * 360); 
        const saturation = 70 + Math.random() * 30;  
        const lightness = 40 + Math.random() * 20;   
      
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      };

      labels?.forEach(() => {
        const color = generateColor();
        backgroundColors.push(color);
        borderColors.push(color.replace('0.7', '1'));
    });


    const chartData = {
        labels:labels,
        datasets: [
            {
                label: 'Number of Blogs',
                data:data,
                backgroundColor:backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };

    return (
        <Doughnut data={chartData} options={options} />
    )
}

export default DoughnutChart