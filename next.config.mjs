/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        AUTHOR: 'hakan dursun',
    },
    eslint:{
        ignoreDuringBuilds:true
    },
    reactStrictMode:true,
    async redirects() {
        return [
            {
                source:"/about",
                destination:"/",
                permanent: true,
            }
        ]
}
};

export default nextConfig;
