/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true, 
	publicRuntimeConfig: {
		apiRoot: process.env.API_ROOT, 
		frontendRoot: process.env.FRONTEND_ROOT, 
	},
};

export default nextConfig;
