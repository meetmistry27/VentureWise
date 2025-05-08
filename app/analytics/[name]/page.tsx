"use client";

// pages/startup/[name].js
import { useSearchParams  } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// API endpoint (replace with your actual endpoint)
//const API_BASE_URL = 'http://localhost:5000/api';

export default function StartupGrowthCharts({ params }) {
  // const router =   useSearchParams();
  // console.log(router)
  // const name = router.get('name');
  const { name } = params
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [growthData, setGrowthData] = useState(null);

  // useEffect(() => {
  //   console.log(name);
  //   if (!name) return;
    
    
  //   const fetchGrowthData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`http://127.0.0.1:5000/api/predict?startup_name=${encodeURIComponent(name)}`);
        
  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.message || 'Failed to fetch growth data');
  //       }
        
  //       const data = await response.json();
  //       setGrowthData(data);
  //       setError(null);
  //     } catch (err) {
  //       console.error('Error fetching growth data:', err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   fetchGrowthData();
  // }, [name]);
  function transformStartupForModel(startup: any) {
    console.log(startup);
    return {
      market_size_estimate: startup.marketSizeEstimate || 5000000, // default or map
      market_growth_rate: startup.marketGrowthRate || 0.1, // 10%
      founder_experience_years: startup.founderExperienceYears || 5,
      founder_previous_exits: startup.founderPreviousExits || 0,
      founder_education_level: startup.founderEducationLevel || "Bachelor's",
      team_size: startup.teamSize ?? 0,
      monthly_active_users: startup.monthlyActiveUsers || 1000,
      revenue_last_month: startup.revenueLastMonth || 10000,
      growth_rate_last_3_months: startup.growthRateLast3Months || 0.2,
      pilot_partnerships: !!startup.pilotPartnerships || 1,
      funding_rounds: startup.fundingRounds || 1,
      total_funding_received: startup.fundingRaised ?? 0,
      investors_count: startup.investorsCount ?? 0,
      industry: startup.industry || "Other",
    };
  }

  

  useEffect(() => {
    async function fetchAndPredict() {
      setLoading(true);
      setError(null);
  
      try {
        // 1. Fetch startup details by name
        const startupRes = await fetch(`http://localhost:3000/api/startups/${name}`); // your custom endpoint
        const startupJson = await startupRes.json();
        
        console.log(startupJson);

        // if (startupJson.status !== 'success') {
        //   throw new Error(startupJson.message || 'Failed to fetch startup data');
        // }
        
        const startupData = startupJson.startup;
        const inputForModel = transformStartupForModel(startupData);

  
        // 2. Send startup data to prediction API
        const predictRes = await fetch('https://startupgrowthpred.onrender.com/api/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputForModel)
        });
  
        const predictJson = await predictRes.json();
  
        if (predictJson.status !== 'success') {
          throw new Error(predictJson.message || 'Prediction failed');
        }
        
        console.log(predictJson)
        // 3. Update state with growth data
        setGrowthData(predictJson);
        // console.log(growthData)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  
    if (name) {
      fetchAndPredict();
    }
  }, [name]);
  

  if (loading) return <div className="text-center p-10">Loading growth projections...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  if (!growthData) return null;

  // Format startup details for display
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR',
      maximumFractionDigits: 2,
      notation: 'compact'
    }).format(value);
  };

  const details = growthData.startup_details;

  // Chart configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(2);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    },
  };

  // Revenue chart data
  const revenueChartData = {
    labels: growthData.years.map(year => `Year ${year}`),
    datasets: [
      {
        label: growthData.revenue.label,
        data: growthData.revenue.data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  // Valuation chart data
  const valuationChartData = {
    labels: growthData.years.map(year => `Year ${year}`),
    datasets: [
      {
        label: growthData.valuation.label,
        data: growthData.valuation.data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  // Market share chart data
  const marketShareChartData = {
    labels: growthData.years.map(year => `Year ${year}`),
    datasets: [
      {
        label: growthData.market_share.label,
        data: growthData.market_share.data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {name} - 5 Year Growth Projection
      </h1>
      
      <div className="bg-gray-50 p-6 mb-8 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Startup Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">Industry</p>
            <p className="font-medium">{details.industry}</p>
          </div>
          <div>
            <p className="text-gray-600">Market Size</p>
            <p className="font-medium">{formatCurrency(details.market_size_estimate * 1000000)}</p>
          </div>
          <div>
            <p className="text-gray-600">Market Growth Rate</p>
            <p className="font-medium">{details.market_growth_rate.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-gray-600">Founder Experience</p>
            <p className="font-medium">{details.founder_experience_years} years</p>
          </div>
          <div>
            <p className="text-gray-600">Total Funding</p>
            <p className="font-medium">{formatCurrency(details.total_funding_received)}</p>
          </div>
          <div>
            <p className="text-gray-600">Current Monthly Revenue</p>
            <p className="font-medium">{formatCurrency(details.revenue_last_month) + " Lakhs"}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Projection</h2>
          <Line options={chartOptions} data={revenueChartData} />
        </div>
        
        {/* Valuation Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Valuation Projection</h2>
          <Line options={chartOptions} data={valuationChartData} />
        </div>
        
        {/* Market Share Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Market Share Projection</h2>
          <Line options={chartOptions} data={marketShareChartData} />
        </div>
      </div>
    </div>
  );
}