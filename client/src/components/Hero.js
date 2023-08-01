import heroImg from "../images/hero-img.jpg";

export default function Hero() {
  return (
    <div class="h-screen bg-gray-50 flex items-center">
      <section
        class="w-full bg-cover bg-center py-32"
        style={{ backgroundImage: heroImg }}
      >
        <div class="container mx-auto text-center text-white">
          <h1 class="text-5xl font-medium mb-6">Welcome to My Blog</h1>
          <p class="text-xl mb-12">
            This blog was created as a project for The Odin Project. It involves
            knowledge about NodeJS and React, in which the former is used as the
            backend and the latter as the frontend. Likewise, both of them talk
            to each other by means of an API. On the other hand, both the
            backend and frontend are hosted on Render.
          </p>
        </div>
      </section>
    </div>
  );
}
