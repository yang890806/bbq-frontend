/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true, 
	publicRuntimeConfig: {
		apiRoot: process.env.API_ROOT, 
		frontendRoot: process.env.FRONTEND_ROOT, 
		imageWidth: process.env.IMAGE_WIDTH, 
		imageHeight: process.env.IMAGE_HEIGHT, 
	},
};

export default nextConfig;
