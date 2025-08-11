import Image from 'next/image'
import { notFound } from 'next/navigation'
import clientsData from '@/data/clients.json'

// Function to create slug from name (same as in component)
function createSlug(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

// Find client by slug
function getClientBySlug(slug) {
    return clientsData.data.find(client => createSlug(client.name) === slug);
}

export default function ClientDetail({ params }) {
    const client = getClientBySlug(params.slug);

    if (!client) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center space-x-4">
                        <a href="/clients" className="text-blue-600 hover:text-blue-800">
                            ← Back to Clients
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Client Header */}
                    <div className="p-8 text-center border-b border-gray-200">
                        <div className="w-48 h-32 mx-auto mb-6 flex items-center justify-center bg-gray-50 rounded-lg">
                            <Image
                                src={`/assets/Clients/${client.image}`}
                                alt={client.name}
                                width={192}
                                height={128}
                                className="object-contain max-w-full max-h-full"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {client.name}
                        </h1>
                        <p className="text-lg text-gray-600">
                            {client.shortDescription}
                        </p>
                    </div>

                    {/* Client Details */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Description */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Description
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {client.longDescription}
                                </p>
                            </div>

                            {/* Project Details */}
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        Project Details
                                    </h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="font-medium text-gray-700">Client ID:</span>
                                            <span className="text-gray-600">#{client.id}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="font-medium text-gray-700">Industry:</span>
                                            <span className="text-gray-600 capitalize">{client.essentialVariable}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="font-medium text-gray-700">Project Date:</span>
                                            <span className="text-gray-600">{new Date(client.dateProjects).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Badge */}
                                <div>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {client.essentialVariable}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Projects or CTA */}
                <div className="mt-12 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Interested in working with us?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Let's discuss your project and how we can help bring your vision to life.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
                    >
                        Get In Touch
                    </a>
                </div>
            </div>
        </div>
    );
}

// Generate static params untuk SEO (optional)
export async function generateStaticParams() {
    return clientsData.data.map((client) => ({
        slug: createSlug(client.name),
    }));
}

// Generate metadata untuk SEO
export async function generateMetadata({ params }) {
    const client = getClientBySlug(params.slug);
    
    if (!client) {
        return {
            title: 'Client Not Found',
        };
    }

    return {
        title: `${client.name} - Our Client | Havor Digital`,
        description: client.longDescription,
        openGraph: {
            title: `${client.name} - Our Client`,
            description: client.shortDescription,
            images: [`/assets/Clients/${client.image}`],
        },
    };
}