/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true, 
	publicRuntimeConfig: {
		apiRoot: process.env.API_ROOT, 
		frontendRoot: process.env.FRONTEND_ROOT, 
		accessTokenMaxAge: process.env.ACCESS_TOKEN_MAX_AGE, 
		refreshTokenMaxAge: process.env.REFRESH_TOKEN_MAX_AGE, 
		imageWidth: process.env.IMAGE_WIDTH, 
		imageHeight: process.env.IMAGE_HEIGHT, 
	},
};

export default nextConfig;
