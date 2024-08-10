import { Box, Flex, Grid, Text, Image, Link, GridItem, Icon } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import avantaa from "../../assets/Images/avantaa.png";
import { FaCalendarCheck, FaClock, FaMedal, FaDollarSign } from 'react-icons/fa';
import { UsedbContext } from '../../Services/UseContext';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {

  const{dbUser}=UsedbContext();

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Events Attended',
        data: [5, 10, 7, 12, 8],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return getGradient(ctx, chartArea);
        },
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 50,
      },
    ],
  };

  const getGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.8)');
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');
    return gradient;
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16,
            weight: 'bold',
            color: '#ffffff',
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
        text: 'Events Attended',
        font: {
          size: 20,
          weight: 'bold',
          color: '#ffffff',
        },
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
            color: '#ffffff',
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
            color: '#ffffff',
          },
        },
      },
    },
  };

  return (
    <Flex minH="100vh" bg="#2c2c6c" direction="column">
      <Flex flex="1" p="10" direction="column" gap="10" bg="#2c2c6c">
        <Box p={4} borderRadius="lg" bg="#1c1c4c" boxShadow="lg">
          <Text fontSize="xl" fontWeight="bold" color="#ff8000">
            Welcome, <span style={{ color: '#ff8000' }}>{dbUser?.name}</span>! 😊
          </Text>
          <Text color="white" mt={2}>
            Find and engage with top volunteer opportunities.
          </Text>
          <Text color="white">
            Make a difference with VolHub today!
          </Text>

          <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={4} mt={4}>
            <GridItem>
              <Flex
                bg="#ef4747"
                borderRadius="lg"
                p={3}
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <Box textAlign="center">
                  <Text fontSize="2xl">{dbUser?.eventsAttended}</Text>
                  <Text>Events Attended</Text>
                </Box>
                <Icon as={FaCalendarCheck} ml={3} boxSize={8} />
              </Flex>
            </GridItem>
            <GridItem>
              <Flex
                bg="#5ccc6c"
                borderRadius="lg"
                p={3}
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <Box textAlign="center">
                  <Text fontSize="2xl">{dbUser?.timeSpent}</Text>
                  <Text>Time Spent</Text>
                </Box>
                <Icon as={FaClock} ml={3} boxSize={8} />
              </Flex>
            </GridItem>
            <GridItem>
              <Flex
                bg="#e94e77"
                borderRadius="lg"
                p={3}
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <Box textAlign="center">
                  <Text fontSize="2xl">{dbUser?.rewardsEarned}</Text>
                  <Text>Rewards Earned</Text>
                </Box>
                <Icon as={FaMedal} ml={3} boxSize={8} />
              </Flex>
            </GridItem>
            <GridItem>
              <Flex
                bg="#f5a623"
                borderRadius="lg"
                p={3}
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <Box textAlign="center">
                  <Text fontSize="2xl">${dbUser?.donationCollected}</Text>
                  <Text>Donation Collected</Text>
                </Box>
                <Icon as={FaDollarSign} ml={3} boxSize={8} />
              </Flex>
            </GridItem>
          </Grid>
        </Box>

        <Grid
          templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
          gap={4}
          h="auto"
        >
          <Box bg="#1c1c4c" boxShadow="xl" p="4" borderRadius="md" h={{ base: '300px', lg: '100%' }}>
            <Text fontSize="lg" fontWeight="bold" color="#ffffff">Events Overview</Text>
            <Box h={{ base: '200px', md: '300px' }}>
              <Bar data={chartData} options={chartOptions} />
            </Box>
          </Box>
          <Box bg="#1c1c4c" boxShadow="xl" p="4" borderRadius="md" h={{ base: 'auto', md: '100%' }}>
            <Text fontSize="xl" fontWeight="bold" color="#ffffff">Recent Event Attended</Text>
            <Link
              href='https://avantaa.in/'
              isExternal
              fontSize="xl"
              color="#0e5fb5"
              fontWeight="500"
              _hover={{ textDecoration: 'underline' }}
            >
              SKCT-AVANTAA
            </Link>
            <Image
              src={avantaa}
              alt="Recent Event"
              mt="4"
              borderRadius="md"
              boxSize={{ base: '100%', md: '70%' }}
              objectFit="cover"
              mx="auto"
            />
          </Box>
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
