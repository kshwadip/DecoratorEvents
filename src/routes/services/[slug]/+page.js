import { error } from '@sveltejs/kit';
import clientData from '$lib/data/client.json';

export const prerender = true;

export function entries() {
	return clientData.services.map((s) => ({ slug: s.slug }));
}

export function load({ params }) {
	const service = clientData.services.find((s) => s.slug === params.slug);
	if (!service) throw error(404, 'Service not found');
	return { service, business: clientData.business };
}