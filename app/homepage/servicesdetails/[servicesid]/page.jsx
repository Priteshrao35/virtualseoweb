import ServiceDetailsPage from './servicedetails';
export const revalidate = 0;

const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export async function generateMetadata({ params }) {
  const { servicesid } = params;

  try {
    const response = await fetch(
      'https://virtualseoweb.pythonanywhere.com/menu-items/',
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }

    const services = await response.json();
    const service = services.find(item =>
      createSlug(item.name) === servicesid
    );

    if (!service) {
      return {
        title: "Service Not Found | Virtualseoweb",
        description: "The service you're looking for couldn't be found.",
        robots: 'noindex, nofollow'
      };
    }

    // Clean content for description
    const cleanDescription = service.content
      ? service.content.replace(/<[^>]*>?/gm, '').slice(0, 160)
      : 'Explore our professional services at Virtualseoweb';

    return {
      title: `${service.name} | Virtualseoweb`,
      description: cleanDescription,
      openGraph: {
        title: `${service.name} | Virtualseoweb`,
        description: cleanDescription,
        images: service.service_Banner ? [{ url: service.service_Banner }] : [],
        url: `https://www.virtualseoweb.com/services/${servicesid}`,
      },
      alternates: {
        canonical: `https://www.virtualseoweb.com/services/${servicesid}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Service Details | Virtualseoweb",
      description: "Explore our professional services at Virtualseoweb",
      robots: 'index, follow'
    };
  }
}

const Page = ({ params }) => {
  return <ServiceDetailsPage params={params} />;
};

export default Page;