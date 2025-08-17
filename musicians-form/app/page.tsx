import Link from "next/link";

export default function HomePage() {
	return (
		<main className="mx-auto max-w-2xl p-6">
			<h1 className="text-3xl font-bold">Musicians</h1>
			<p className="mt-2 text-gray-600">Create and manage musician records.</p>
			<div className="mt-6">
				<Link
					href="/musicians/new"
					className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					Create Musician
				</Link>
			</div>
		</main>
	);
}