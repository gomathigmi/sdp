import { useState, useEffect } from 'react';
import { Box, Flex, Grid, Text, Image, Link } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import brochure1 from '../../assets/Images/Brochures/brochure1.png';
import brochure2 from '../../assets/Images/Brochures/brochure2.png';
import brochure3 from '../../assets/Images/Brochures/brochure3.png';
import brochure4 from '../../assets/Images/Brochures/brochure4.png';
import { UsedbContext } from '../../Services/UseContext';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const {dbUser}=UsedbContext();

  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [brochure1, brochure2, brochure3, brochure4];
  
  // Automatically move to the next slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  // Function to handle dot navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Sample data for the bar chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Example months
    datasets: [
      {
        label: 'Events Organized',
        data: [5, 10, 7, 12, 8], // Example data
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return getGradient(ctx, chartArea);
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        borderRadius: 8, // Rounded corners
        barThickness: 50, // Adjust this value to increase bar width
      },
    ],
  };

  // Gradient function for the chart bars
  const getGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.8)');
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');
    return gradient;
  };

  // Options for the bar chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
      },
      title: {
        display: true,
        text: 'Events Organized',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#333',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          borderColor: '#ddd',
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <Flex h="100vh" bg="#2c2c6c">
      <Flex flex="1" p="8" direction="column" gap="8" bg="#2c2c6c">
        {/* First Grid: 4 boxes with gradient backgrounds */}
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
          gap="6"
          alignItems="stretch"
          justifyContent="space-between"
          h="30%" // Adjust the height as needed
        >
          <Box
            bg="linear-gradient(to right, #d15a15, #edbf9a)" // Gradient background
            boxShadow="xl" // Increased shadow
            p="6"
            borderRadius="md"
            h="100%"
            transition="transform 0.3s"
            _hover={{ transform: 'scale(1.05)', boxShadow: '2xl' }} // Hover effect
          >
            <Text fontSize="xl" fontWeight="bold" color="white">Events Organized</Text>
            <Text fontSize="2xl" mt="4" color="white">{dbUser?.eventsAttended}</Text>
          </Box>
          <Box
            bg="linear-gradient(to right, #0c9122, #a6e7c7)" // Gradient background
            boxShadow="xl" // Increased shadow
            p="6"
            borderRadius="md"
            h="100%"
            transition="transform 0.3s"
            _hover={{ transform: 'scale(1.05)', boxShadow: '2xl' }} // Hover effect
          >
            <Text fontSize="xl" fontWeight="bold" color="white">Volunteers TurnOut</Text>
            <Text fontSize="2xl" mt="4" color="white">{dbUser?.timeSpent}</Text>
          </Box>
          <Box
            bg="linear-gradient(to right, #d92b5f, #fb9da9)" // Gradient background
            boxShadow="xl" // Increased shadow
            p="6"
            borderRadius="md"
            h="100%"
            transition="transform 0.3s"
            _hover={{ transform: 'scale(1.05)', boxShadow: '2xl' }} // Hover effect
          >
            <Text fontSize="xl" fontWeight="bold" color="white">Sessions Conducted</Text>
            <Text fontSize="2xl" mt="4" color="white">{dbUser?.rewardsEarned}</Text>
          </Box>
          <Box
            bg="linear-gradient(to right, #18a198, #78f5f1)" // Gradient background
            boxShadow="xl" // Increased shadow
            p="6"
            borderRadius="md"
            h="100%"
            transition="transform 0.3s"
            _hover={{ transform: 'scale(1.05)', boxShadow: '2xl' }} // Hover effect
          >
            <Text fontSize="xl" fontWeight="bold" color="white">Funds Raised</Text>
            <Text fontSize="2xl" mt="4" color="white">{dbUser?.donationCollected}</Text>
          </Box>
        </Grid>

        {/* Second Grid: 2 boxes */}
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap="6"
          h="30%"
        >
          <Box bg="white" boxShadow="xl" p="6" borderRadius="md" h="100%">
            <Text fontSize="lg" fontWeight="bold" color="black">Events Overview</Text>
            <Bar data={chartData} options={chartOptions} />
          </Box>
          <Box bg="white" boxShadow="xl" pb="100" pt={10} borderRadius="md" h="100%">
            <Text fontSize="xl" fontWeight="bold" pl={6} color="black">Recent Event Organized</Text>
            <Link
              href="https://www.knowafest.com/explore/events/2024/01/0801-international-conference-sustainable-innovations-engineering-management-icsiem-2024-sri-krishna-college-technology-coimbatore"
              isExternal
              fontSize="xl"
              color="#0e5fb5"
              fontWeight="500"
              paddingLeft={6}
              _hover={{ textDecoration: 'underline' }}
            >
              KNOWAFEST
            </Link>
            <Box position="relative" ml="6" mr="6" mt="4" h="200px" overflow="hidden"> {/* Ensure overflow hidden */}
              <Box
                position="relative"
                display="flex"
                transition="transform 0.5s ease-in-out"
                transform={`translateX(-${currentSlide * 100}%)`} // Move image container
                height="100%"
              >
                {images.map((image, index) => (
                  <Box key={index} flex="0 0 100%" height="100%">
                    <Image
                      src={image}
                      alt={`Recent Event ${index}`}
                      borderRadius="md"
                      boxSize="100%"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </Box>
              <Box
                position="absolute"
                bottom="10px"
                left="50%"
                transform="translateX(-50%)"
                display="flex"
                gap="2"
              >
                {images.map((_, index) => (
                  <Box
                    key={index}
                    width="6px"
                    height="6px"
                    borderRadius="full"
                    bg={index === currentSlide ? 'black' : 'gray.300'}
                    cursor="pointer"
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Flex>
    </Flex>
  );
}
export default Dashboard;
