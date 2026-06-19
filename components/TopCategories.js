import Image from "next/image";




export default function TopCategories() {
  return (
    <div className="h-full lg:h-screen bg-[#a8a0d0]">
      {/* <Image
          src={'/TryOut.jpeg'}
          alt={"title"}
          fill
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
          priority
        /> */}
        <Image
          src={'/TryOut-Banner-1-Color.webp'}
          alt={"title"}
          width={1000}
          height={1000}
          className="h-full w-full object-contain"
        />
    </div>
  );
}
