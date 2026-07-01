"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";


const slides = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
];


export default function HomeBanner(){

const [index,setIndex] = useState(0);


const [ref,api] = useEmblaCarousel(
{
 loop:true,
 watchDrag:false
},
[
 Autoplay({
  delay:4000,
  stopOnInteraction:false
 })
]
);



useEffect(()=>{

if(!api) return;

const update = ()=> {
 setIndex(api.selectedScrollSnap());
};

api.on("select",update);

},[api]);



return (

<section
className="
group
relative
h-[70vh]
md:h-screen
overflow-hidden
bg-black
"
>


{/* Embla controller */}

<div
ref={ref}
className="absolute inset-0 opacity-0"
>

<div className="flex h-full">

{
slides.map((_,i)=>(

<div
key={i}
className="min-w-full"
/>

))
}

</div>

</div>



{/* Fade Images */}


<AnimatePresence mode="sync">


<motion.img

key={index}

src={slides[index]}

initial={{
opacity:0,
scale:1.08
}}

animate={{
opacity:1,
scale:1
}}

exit={{
opacity:0
}}

transition={{
duration:1.2,
ease:"easeInOut"
}}

className="
absolute
inset-0
h-full
w-full
object-cover
"

/>


</AnimatePresence>




{/* Left Arrow */}


<button

onClick={()=>api?.scrollPrev()}

className="
absolute
left-4
top-1/2
-translate-y-1/2
z-20

h-10
w-10
md:h-12
md:w-12

rounded-full

bg-black/40

text-white

text-3xl

opacity-0

group-hover:opacity-100

transition

hover:scale-110
"

>

‹

</button>





{/* Right Arrow */}


<button

onClick={()=>api?.scrollNext()}

className="
absolute
right-4
top-1/2
-translate-y-1/2
z-20

h-10
w-10
md:h-12
md:w-12

rounded-full

bg-black/40

text-white

text-3xl

opacity-0

group-hover:opacity-100

transition

hover:scale-110
"

>

›

</button>





{/* Dots */}

<div

className="
absolute
bottom-6
left-1/2
-translate-x-1/2
flex
gap-2
z-20
"

>


{
slides.map((_,i)=>(

<button

key={i}

onClick={()=>api?.scrollTo(i)}

className={`
h-2
rounded-full
transition-all

${
index===i
?
"w-8 bg-white"
:
"w-2 bg-white/50"
}

`}

/>

))
}


</div>


</section>

)

}