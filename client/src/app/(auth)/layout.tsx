import VideoPlayer from '@/common/Video/video';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen w-full">
      <VideoPlayer
        src="https://dc3yp5a9dizw2.cloudfront.net/videos/Authbackground.mp4"
        poster="https://www.w3schools.com/html/mov_bbb.jpg"
        controls={false}
        autoPlay={true}
        loop={true}
        muted={true}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="z-2 absolute inset-0 bg-auth-gradient opacity-70" />
      <div className="relative z-10 flex h-full w-full justify-center">
        {children}
      </div>
    </div>
  );
}
