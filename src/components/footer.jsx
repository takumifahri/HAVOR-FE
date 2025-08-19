import Image from "next/image"
import Link from "next/link"
import logo from '../../public/assets/logo.svg'
export default function Footer() {
    return (
        <>
            <footer className="footer sm:footer-horizontal border-t border-base-400 text-base-content p-10">
                <aside>
                    <Image src={logo} alt="Havor Smarta Digital Logo" width={100} height={100} />
                    <p>
                        HAVOR SMARTA DIGITAL.
                        <br />
                        Your Digital IT Partner Solution
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <Link href="/services/web-development">
                        <p className="link link-hover">Branding</p>
                    </Link>
                    <Link href="/services/web-development">
                        <p className="link link-hover">Design</p>
                    </Link>
                    <Link href="/services/web-development">
                        <p className="link link-hover">Marketing</p>
                    </Link>
                    <Link href="/services/web-development">
                        <p className="link link-hover">Advertisement</p>
                    </Link>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <Link href="/services/web-development">
                        <p className="link link-hover">About us</p>
                    </Link>
                    <Link href="/services/web-development">
                        <p className="link link-hover">Contact</p>
                    </Link>
                    <Link href="/services/web-development">
                        <p className="link link-hover">Jobs</p>
                    </Link>
                    <Link href="/services/web-development">
                        <p className="link link-hover">Press kit</p>
                    </Link>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <Link href="/services/web-development">
                        <p className="link link-hover">Terms of use</p>
                    </Link>
                    <Link href="/services/web-development">
                        <p className="link link-hover">Privacy policy</p>
                    </Link>
                    <Link href="/services/web-development">
                        <p className="link link-hover">Cookie policy</p>
                    </Link>
                </nav>

            </footer>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content border-t border-base-300">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All rights reserved by HAVOR SMARTA DIGITAL</p>
                </aside>
            </footer>
        </>

    )
}