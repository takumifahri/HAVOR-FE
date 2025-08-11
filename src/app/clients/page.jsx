import Image from 'next/image'
import Link from 'next/link'
import clientsData from '@/data/clients.json'

// Function to create slug from name
function createSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export default function ClientsPage() {
    const clients = clientsData.data;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Clients
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We're proud to work with industry leaders and innovative companies across various sectors.
                    </p>
                </div>
            </div>

            {/* Clients Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {clients.map((client) => (
                        <Link
                            key={client.id}
                            href={`/clients/${createSlug(client.name)}`}
                            className="group"
                        >
                            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center justify-center h-32">
                                <Image
                                    src={`/assets/Clients/${client.image}`}
                                    alt={client.name}
                                    width={100}
                                    height={60}
                                    className="object-contain max-w-full max-h-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                            <p className="text-center text-sm font-medium text-gray-900 mt-3 group-hover:text-blue-600 transition-colors duration-200">
                                {client.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const metadata = {
    title: 'Our Clients | Havor Digital',
    description: 'Discover the companies and brands we\'ve had the privilege to work with.',
};