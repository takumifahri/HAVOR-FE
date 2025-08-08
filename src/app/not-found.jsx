
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function NotFound() {
    return (
        <>
            
            <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 px-4">
                <div className="text-center max-w-md">
                    {/* 404 Number */}
                    <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                    
                    {/* Error Message */}
                    <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-4">
                        Page Not Found
                    </h2>
                    
                    <p className="text-base md:text-lg text-base-content/70 mb-8">
                        Oops! The page you are looking for does not exist or has been moved.
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/" className="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Go Back Home
                        </Link>
                        
                        <Link href="/contact" className="btn btn-outline btn-primary">
                            Contact Support
                        </Link>
                    </div>
                    
                    {/* Additional Help */}
                    <div className="mt-8 text-sm text-base-content/60">
                        <p>Need help? Try these popular pages:</p>
                        <div className="flex flex-wrap justify-center gap-2 mt-2">
                            <Link href="/about" className="link link-hover">About</Link>
                            <span>•</span>
                            <Link href="/services" className="link link-hover">Services</Link>
                            <span>•</span>
                            <Link href="/contact" className="link link-hover">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}