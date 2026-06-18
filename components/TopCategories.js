import Image from "next/image";




export default function TopCategories() {
  return (
    <div className="">
      {/* <Image
          src={'/TryOut.jpeg'}
          alt={"title"}
          fill
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
          priority
        /> */}
        <Image
          src={'/TryOut.jpeg'}
          alt={"title"}
          width={1000}
          height={1000}
          className="lg:h-screen h-full w-full "
        />
    </div>
  );
}
