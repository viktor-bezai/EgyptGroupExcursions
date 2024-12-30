module.exports = {
  siteUrl: 'https://mystical-egypt-travels.online',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/swagger/*', '/media/*', '/static/*'],
  async additionalPaths(config) {
    const dynamicPaths = await fetchDynamicPaths();
    return dynamicPaths.map((path) => ({ loc: path }));
  },
};

async function fetchDynamicPaths() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${apiUrl}/tours/?lang=ru`);
    if (!response.ok) {
      console.error(`Failed to fetch tours: ${response.statusText}`);
    }
    const tours = await response.json();

    return tours.map((tour) => `/tour/${tour.slug}`);
  } catch (error) {
    console.error('Error generating dynamic paths:', error);
    return [];
  }
}
