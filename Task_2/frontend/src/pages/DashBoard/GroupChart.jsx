import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    defaults
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Legend,
    Tooltip
);

defaults.maintainAspectRatio = false
defaults.responsive=true

const GroupChart = ({allBlogs}) => {

// X-axis: Blog titles
// Y-axis: Count (number of likes and comments)
// Bars: Two per blog — one for likes, one for comments
// Legend: Color-coded for Likes and Comments


//filtered on the basis that blog have atleast one comment
const filteredBlogs = allBlogs?.filter(blog => {
    const hasLikes = blog.likes > 0;
    const hasComments = blog.comments && Object.keys(blog.comments).length > 0;
    return hasLikes || hasComments;
  });


    const data = {
        labels: filteredBlogs?.map(blog => blog.title),
        datasets: [
            {
                label: 'Likes',
                data: filteredBlogs?.map(blog => blog?.likes?.length),
                backgroundColor: 'rgba(75, 192, 192, 0.7)',
            },
            {
                label: 'Comments',
                data:filteredBlogs?.map(blog => Object.keys(blog.comments || {}).length) ,
                backgroundColor: 'rgba(153, 102, 255, 0.7)',
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                stacked: false,
            },
            y: {
                beginAtZero: true,
                suggestedMax:5 , 
                // ticks:{
                //     stepSize:5
                // }
            },
        },
    };

    return (
        <Bar data={data} options={options} />
    )
}

export default GroupChart