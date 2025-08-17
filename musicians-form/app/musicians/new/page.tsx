"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

const PrimaryInstrumentEnum = z.enum([
	"Vocal",
	"Guitar",
	"Bass",
	"Drums",
	"Keys",
	"Strings",
	"Brass",
	"Woodwinds",
	"Percussion",
	"Other"
]);

const MusicianSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	stageName: z.string().optional().or(z.literal("")),
	email: z.string().email("Enter a valid email"),
	primaryInstrument: PrimaryInstrumentEnum.default("Vocal"),
	genres: z.array(z.string()).min(1, "Select at least one genre"),
	yearsActive: z
		.number({ invalid_type_error: "Years active must be a number" })
		.int()
		.min(0)
		.max(100),
	website: z.string().url("Enter a valid URL").optional().or(z.literal("")),
	description: z.string().max(1000, "Max 1000 characters").optional().or(z.literal(""))
});

export type MusicianInput = z.infer<typeof MusicianSchema>;

const GENRES = [
	"Rock",
	"Pop",
	"Hip-Hop",
	"Jazz",
	"Classical",
	"Country",
	"Electronic",
	"R&B",
	"Metal",
	"Folk"
];

export default function NewMusicianPage() {
	const [serverMessage, setServerMessage] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<MusicianInput>({ resolver: zodResolver(MusicianSchema), defaultValues: { primaryInstrument: "Vocal", genres: [] } });

	const onSubmit = async (data: MusicianInput) => {
		setSubmitting(true);
		setServerMessage(null);
		try {
			const res = await fetch("/api/musicians", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data)
			});
			const json = await res.json();
			if (!res.ok) throw new Error(json?.error || "Failed to submit");
			setServerMessage("Musician created successfully!");
			reset();
		} catch (err: any) {
			setServerMessage(err.message || "Something went wrong");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<main className="mx-auto max-w-3xl p-6">
			<h1 className="text-2xl font-bold">New Musician</h1>
			<p className="mt-1 text-gray-600">Fill out the details below.</p>

			<form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label className="label" htmlFor="firstName">First name</label>
						<input id="firstName" className="input" {...register("firstName")} />
						{errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
					</div>
					<div>
						<label className="label" htmlFor="lastName">Last name</label>
						<input id="lastName" className="input" {...register("lastName")} />
						{errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label className="label" htmlFor="stageName">Stage name</label>
						<input id="stageName" className="input" {...register("stageName")} placeholder="Optional" />
					</div>
					<div>
						<label className="label" htmlFor="email">Email</label>
						<input id="email" type="email" className="input" {...register("email")} />
						{errors.email && <p className="error-text">{errors.email.message}</p>}
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label className="label" htmlFor="primaryInstrument">Primary instrument</label>
						<select id="primaryInstrument" className="input" {...register("primaryInstrument")}>
							{PrimaryInstrumentEnum.options.map((v) => (
								<option key={v} value={v}>{v}</option>
							))}
						</select>
					</div>
					<div>
						<label className="label">Genres</label>
						<div className="mt-2 grid grid-cols-2 gap-2">
							{GENRES.map((g) => (
								<label key={g} className="inline-flex items-center gap-2 text-sm">
									<input type="checkbox" value={g} {...register("genres")} />
									<span>{g}</span>
								</label>
							))}
						</div>
						{errors.genres && <p className="error-text">{errors.genres.message}</p>}
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label className="label" htmlFor="yearsActive">Years active</label>
						<input id="yearsActive" type="number" className="input" {...register("yearsActive", { valueAsNumber: true })} />
						{errors.yearsActive && <p className="error-text">{errors.yearsActive.message}</p>}
					</div>
					<div>
						<label className="label" htmlFor="website">Website</label>
						<input id="website" className="input" {...register("website")} placeholder="https://..." />
						{errors.website && <p className="error-text">{errors.website.message}</p>}
					</div>
				</div>

				<div>
					<label className="label" htmlFor="description">Bio / Description</label>
					<textarea id="description" rows={4} className="input" {...register("description")} />
					{errors.description && <p className="error-text">{errors.description.message}</p>}
				</div>

				<div className="flex items-center gap-3">
					<button disabled={submitting} type="submit" className="btn btn-primary">{submitting ? "Submitting..." : "Submit"}</button>
					<button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
				</div>

				{serverMessage && (
					<p className="mt-2 text-sm text-gray-700" role="status">{serverMessage}</p>
				)}
			</form>
		</main>
	);
}