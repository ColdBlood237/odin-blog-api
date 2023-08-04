import heroImg from "../images/hero-img.jpg";

export default function Hero() {
  return (
    <section
      className="w-full bg-cover bg-center py-32"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImg})`,
      }}
    >
      <div className="container mx-auto text-center text-white">
        <h1 className="text-5xl font-medium mb-6">Welcome to My Blog</h1>
        <p className="text-xl mb-12">
          This blog was created as a project for The Odin Project. It involves
          knowledge about NodeJS and React, in which the former is used as the
          backend and the latter as the frontend. Likewise, both of them talk to
          each other by means of an API. On the other hand, the backend is
          hosted on render and the frontend on vercel.
        </p>
      </div>
    </section>
  );
}
