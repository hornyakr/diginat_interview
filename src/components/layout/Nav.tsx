import Link from "next/link";

export default function Nav() {
    return (
        <nav className="container">
            <ul className="flex items-center justify-center gap-4">
                <li>
                    <Link href={'/'}>Cím szerkesztése</Link>
                </li>
                <li>
                    <Link href={'/finish'}>Posztolás</Link>
                </li>
            </ul>
        </nav>
    )
}